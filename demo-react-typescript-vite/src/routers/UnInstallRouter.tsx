
import UninstallFeature from "@swift/features/UninstallFeature";

function UnInstallRouter() {
  // const { onRedirectApp } = useFuncRedirect();

  // const {  isSuccess ,data:customerInfo} = useGetCustomerDetailStore({
  //   onSuccess() {
  //       return
  //   },
  // });

  // // blocking navigate when user try back url on button back of browser
  // useBlocker(!isSuccess || !customerInfo?.data);

  // useEffect(() => {
  //   if (!isSuccess || !customerInfo?.data) return;
  //   onRedirectApp("/");
  // }, [isSuccess]);

  return <UninstallFeature />;
}

export default UnInstallRouter;
