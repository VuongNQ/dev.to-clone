import { KeyOptimzie } from "./optimizeTheme";


export enum EOnBoard {
  not_onboard = 0,
  onBoarded = 1,
}

export enum BlockExtentionApp {
  swift_seo="swift-seo",
  swift_speed="swift-speed"
}

export enum AppLock {
  un_lock = 0,
  lock = 1,
}

export interface IDataPagination<T> {
  current_page: number;
  from?: number;
  last_page_url?: string | null;
  next_page_url: string | null;
  to?: number;
  total: number;
  per_page?: string;
  last_page: number;
  data: T;
}


export interface IFetchAPI {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | FormData;
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
  fetchOnMount?: boolean;
  isFormData?: boolean;
  queryOptions?: Record<string, unknown>
  token?: string
  fullUrl?: string
}

export interface ModalBaseInfoType {
  isOpenModal?: boolean;
  title_header?: string;
  title?: string | JSX.Element |JSX.Element[];
  icon?: string;
  des?: string | JSX.Element | JSX.Element[];
  // isIconImage?: boolean;
  titleSecondaryAction?: string;
  titlePrimaryAction?: string;
  isDisablePrimaryAction?: boolean;
  isDisableSecondaryAction?: boolean;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onCloseAction?: () => void;
  isDestructive?: boolean;
  isLoadingPrimaryAction?: boolean;
  isLoadingSecondaryAction?: boolean;
  titleHidden?: boolean;
  isOutline?: boolean;
  errorID?: string | null;
  desKey?: string // key translate
  isSmall?:boolean
}

export enum EDaysFilter {
  all_time = 0,
  seven_day = 7,
  thirty_day = 30,
  ninety_day = 90,
  one_year = 365,
}


export interface IDataCrispChat {
	name: string;
	email: string;
	shopify_domain: string;
	shopify_plan: string;
	shopify_theme: string;
	sw_installed: string;
	sw_plan: string;
	sw_uninstalled: string;
	sw_status: boolean;
	sw_trial_status: string;
	sw_aff_referral: boolean;
	sw_rev: number;
	sw_swe_number_of_ticket: number;
	sw_swe_status: boolean;
}

export interface IAutoOptimizeSetting {
  [EKeyAutoOptimizeSetting.auto_optimize_image]: boolean;
  [EKeyAutoOptimizeSetting.auto_optimize_theme]: boolean;
  [EKeyAutoOptimizeSetting.setting_theme]?: Omit<KeyOptimzie, "duplicate">[];
}

export enum EKeyAutoOptimizeSetting {
  auto_optimize_image = "auto_optimize_image",
  auto_optimize_theme = "auto_optimize_theme",
  setting_theme = "setting_theme",
}

