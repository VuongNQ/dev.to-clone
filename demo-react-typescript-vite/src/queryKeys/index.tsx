import {
  mergeQueryKeys,
  inferQueryKeyStore,
} from "@lukemorales/query-key-factory";
import { pricingQueryKey } from "./pricingQueryKey";
import { basicSeoQueryKey } from "./basicSeoQueryKey";
import { customerQueryKey } from "./customerQueryKey";
import { crispQueryKey } from "./crispQueryKey";
import { profileQueryKey } from "./profileQueryKey";
import { advancedSeoQueryKey } from "./advancedSeoQueryKey";
import { portalQueryKey } from "./portalQueryKey";
import { smartBoosterQueryKey } from "./smartBoosterQueryKey";
import { customLoadingQueryKey } from "./customLoadingQueryKey";
import { boostHistoryQueryKey } from "./boostHistoryQueryKey";
import { optimizeThemeQueryKey } from "./optimizeThemeQueryKey";
import { optimizeImageQueryKey } from "./optimizeImageQueryKey";
import { oneExpertsQueryKey } from "./oneExpertsQueryKey";
import { extensionQueryKey } from "./extensionQueryKey";
import { scanSpeedQueryKey } from "./scanSpeedQueryKey";

export const queryKeys = mergeQueryKeys(
  pricingQueryKey,
  basicSeoQueryKey,
  customerQueryKey,
  crispQueryKey,
  profileQueryKey,
  advancedSeoQueryKey,
  portalQueryKey,
  smartBoosterQueryKey,
  boostHistoryQueryKey,
  customLoadingQueryKey,
  optimizeThemeQueryKey,
  optimizeImageQueryKey,
  oneExpertsQueryKey,
  extensionQueryKey,
  scanSpeedQueryKey
);

export type TQueryKeys = inferQueryKeyStore<typeof queryKeys>;
