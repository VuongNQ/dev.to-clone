import { globalActions } from "@swift/store/global";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from ".";

const useUnAuthentication = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    /* handle check user's plan  current*/
    const handleSetLockAppRedux = (isLockApp: boolean) => {
        dispatch(
            globalActions.updateCustomer({
                app_lock: isLockApp,
            })
        );
    };

    const redirectUnAuthentication = (result: Response) => {
        return new Promise((res/* , rej */) => {
            if (result.status === 401) {
                handleSetLockAppRedux(true);
                navigate("/un-install");
                res(false);
            }
            res(true);
        });
    };
    return { redirectUnAuthentication };
};

export { useUnAuthentication };
