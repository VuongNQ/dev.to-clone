import { MutableRefObject, useCallback } from "react";

/**
 *
 * scroll top every change page
 *
 */
const useScrollView = ({ ref }: IPropsUseScrollView) => {

  const onScrollView = useCallback(
    (block: ScrollLogicalPosition) => {
        if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: block,
        });
      }
    },
    [ref]
  );

  return {
    onScrollView,
  };
};

interface IPropsUseScrollView {
  ref: MutableRefObject<HTMLTableElement | HTMLDivElement | null>;
}
export default useScrollView;
