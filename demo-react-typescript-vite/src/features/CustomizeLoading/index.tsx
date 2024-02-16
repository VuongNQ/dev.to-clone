import StatusActiveExtensionApp from "@swift/components/StatusActiveExtensionApp";
import HomeCustomLoading from "./components/HomeCustomLoading";
import { CustomLoadingProvider } from "./context/ContextCustomLoading";

const CustomizeLoadingFeature = () => {
    return (
        <div className="p-5 flex flex-col gap-5">
            <CustomLoadingProvider>
                <HomeCustomLoading />
            </CustomLoadingProvider>
            <StatusActiveExtensionApp extension="speed" />
        </div>
    );
};

export default CustomizeLoadingFeature;
