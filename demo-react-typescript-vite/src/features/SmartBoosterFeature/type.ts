export interface DataWarningType {
  title: string;
  errors?: {
    message: string;
  };
  titlePrimaryAction?: string;
  titleSecondaryAction?: string;
  onActionPrimary?: () => void;
  onCloseModalError?: () => void;
  isDissconnect?: boolean;
}

export interface ModalSmartBoosterType {
  isOpenModal: boolean;
  dataError?: {
    isDissconnect?: boolean;
    errors?: {
      message: string;
    };
  };
}


export interface googleAnalyticSliceType {
  userGA: userGAStoreType | null;
}
export interface userGAStoreType {
  id?: number;
  active_preload?: 1 | 0;
  preload_method?: "basic" | "smart";
  store_connected_GA?: boolean;
  analytics_view_id?: number;
  account_google_store?: number;
}
export interface UpdateUserGoogleAnalyticActionType {
  id?: number;
  active_preload?: 1 | 0;
  preload_method?: "basic" | "smart";
  store_connected_GA?: boolean;
  analytics_view_id?: number | null;
  account_google_store?: number | null;
}
export interface ProfileGAType {
  web_properties_name: string;
  management_profiles: ManagementProfilesType[];
}

export interface ManagementProfilesType {
  id: string;
  name: string;
  webPropertyId: string;
}
export interface ChooseProfilePayloadType {
  analytics_profile_id: string;
  analytics_web_property_id: string;
  shopify_domain: string;
  store_id: number;
}
