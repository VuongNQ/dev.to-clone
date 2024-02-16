
import { router } from "@swift/routers";
import { useCallback, useEffect } from "react";
import { useBlocker, type To } from "react-router-dom";

/**
 * @param isBlocked boolean is allow hook run
 * 
 * @description
 * base on comment of issue https://github.com/remix-run/react-router/issues/8139#issuecomment-1361787824
 * hook include action block when user change navigate menu and refresh page
 * - on user change navigate, using useBlock hook of react-router-dom to tracking change
 * - on user refresh page, using event beforeunload to blocking
 *
 * @tutorial
 * call hook on last component want to block. example: const { blocker } = useNavigateBlock(isBlocked);
 * if you want show prompt when user refresh page, add hook run initBlockRefresh in component call hook
 * base on condition input isBlocked to init blocking, like below
 *  useEffect(()=>{ if(dataBoostSEOContext.isChangeData) return initBlockerFirst() },[dataBoostSEOContext.isChangeData]);
 */
export const useNavigateBlocker = (isBlocked: boolean) => {
	const _navigate = router.navigate.bind(router);

	type Listener = () => boolean | Promise<boolean>;

	const listeners: Listener[] = [];

	const blocker = useBlocker(isBlocked);

	router.navigate = async (...args) => {
		const params = args as [To];

		if (listeners.length > 0) {
			const promises = listeners.map((fn) => fn());
			const values = await Promise.all(promises);
			const allowed = values.every(Boolean);

			if (!allowed) return;
		}

		return _navigate(...params);
	};

	const beforeUnload = (e: BeforeUnloadEvent) => {
		// console.log('block ne')
		// Cancel the event.
		e.preventDefault();
		// Chrome (and legacy IE) requires returnValue to be set.
		e.returnValue = "";
	};

	function blockNavigation(fn: Listener) {
		// console.log(listeners, fn);
		if (listeners.length === 0) {
			addEventListener("beforeunload", beforeUnload, { capture: true });
		}

		listeners.push(fn);

		return () => {
			const index = listeners.indexOf(fn);
			listeners.splice(index, 1);
			if (listeners.length === 0) {
				removeEventListener("beforeunload", beforeUnload, { capture: true });
			}
		};
	}

	function useBlockerCustom(dirty: boolean, blocker: Listener) {
		useEffect(() => {
			if (!dirty) return;
			return blockNavigation(blocker);
		}, [blocker, dirty]);
	}

	function resetLister() {
		listeners.length = 0;
		removeEventListener("beforeunload", beforeUnload, { capture: true });
	}

	function initBlockRefresh() {
		return blockNavigation(() => blocker.state === "unblocked");
	}

	useBlockerCustom(
		blocker.state === "blocked",
		useCallback(() => blocker.state === "unblocked" && !isBlocked, [blocker.state, isBlocked])
	);

	// Reset the blocker if the user cleans the form
	useEffect(() => {
		if (blocker.state === "blocked" && !isBlocked) {
			blocker.reset();
		}
	}, [blocker, isBlocked]);

	return {
		blocker,
		isBlocking: blocker.state === 'blocked' && isBlocked,
		initBlockRefresh,
		resetLister,
		cancelNavigate: () => {
			blocker.reset?.();
		},
		confirmNavigate: () => {
			resetLister();
			blocker.proceed?.();
		},
	};
};
