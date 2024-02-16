import { createCtx } from "@swift/contexts/CreateContext";
import reducerCustomLoading, { initialStateCustomLoading } from "../reducers/reducerCustomLoading";

const [ctx, Provider] = createCtx(
  reducerCustomLoading,
  initialStateCustomLoading
);
export const CustomLoadingContext = ctx;

export const CustomLoadingProvider = Provider