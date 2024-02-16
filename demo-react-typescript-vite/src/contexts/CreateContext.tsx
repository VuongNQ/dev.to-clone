import { createContext, Dispatch, PropsWithChildren, Reducer, useReducer } from "react";

export function createCtx<StateType, ActionType>(
	reducer: Reducer<StateType, ActionType>,
	initialState: StateType
) {
	const defaultDispatch: Dispatch<ActionType> = () => initialState; // we never actually use this

	const ctx = createContext({
		state: initialState,
		dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
	});

	function Provider(props: PropsWithChildren) {
		const [state, dispatch] = useReducer<
			Reducer<StateType, ActionType>
		>(reducer, initialState);
		return <ctx.Provider value={{ state, dispatch }} {...props} />;
	}

	return [ctx, Provider] as const;
}
