import { IDataGetTokenPortal } from "@swift/types/portal";
import { createContext } from "react";

export const INIT_DATA_PORTAL: IDataGetTokenPortal | null | undefined = null;
// export const initialStatePortal: IDataGetTokenPortal | null = {
//   exp: 999999999999,
//   token:
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfbmFtZSI6InBvcnRhbF90cmFuc2N5Iiwic3RvcmVfaWQiOiI3NjEzNjkzOTg0MSIsImV4cCI6MTY4NzgzNDIxMn0.VIHP6jVRNl0LyEAVBug4xwurYBey2Bu9BicfqMgGFik",
// };

export const initialPortalContext: IInitialPortalContext = {
  infoPortal: INIT_DATA_PORTAL,
  isLoading: false,
  setInfoPortal: () => null,
};

export const PortalContext =
  createContext<IInitialPortalContext>(initialPortalContext);

/**interface */
interface IInitialPortalContext {
  infoPortal: IDataGetTokenPortal | null | undefined;
  isLoading: boolean;
  setInfoPortal: (value: IDataGetTokenPortal | null | undefined) => void;
}

/**end interface */
