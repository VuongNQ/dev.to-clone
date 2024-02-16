import { useCallback, useState } from "react";

export function useToastGeneral() {
  const [toastInfo, setToastInfo] = useState({
    message: "",
    isError: false,
    isOpen: false,
  });

  /** handle set toast info */
  const toggleIsOpenToast = useCallback(
    ({
      message = "",
      isError = false,
      isOpen = false,
    }: {
      message?: string;
      isError?: boolean;
      isOpen?: boolean;
    }) => {
      setToastInfo((preValue) => {
        return {
          ...preValue,
          message,
          isError,
          isOpen,
        };
      });
    },
    []
  );
  /** end handle set toast info */

  return {
    toastInfo,
    toggleIsOpenToast,
  };
}
