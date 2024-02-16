// smart booster
export interface IDataAccountGA {
  email: string;
  feature: KeyFeatureGoogle;
  id: number;
  name: string;
  store_id: number;
}
export interface IDataSettingGA {
  account: string | null;
  id: number;
  is_connected: KeyStepConnectGoogle;
  measurementId: string | null;
  property: string | null;
  step: KeyStepGA;
  store_id: number;
}

export interface IDataDetailGA {
  account: IDataAccountGA;
  setting: IDataSettingGA;
}

export enum KeyFeatureGoogle {
  GA = "ga4",
  sitemap = "sitemap",
}

export interface IDataAccountGA {
  createTime: string;
  deleted: string | null;
  displayName: string;
  name: string;
  properties: IDataPropertiesGA[];
  regionCode: string;
  updateTime: string;
}
export interface IDataPropertiesGA {
  account: string;
  createTime: string;
  currencyCode: string | null;
  dataStreams: IDataStreamsGA[];
  deleteTime: string | null;
  displayName: string;
  expireTime: string | null;
  industryCategory: string | null;
  name: string;
  parent: string;
  propertyType: string;
  serviceLevel: string;
  timeZone: string;
}
export interface IDataStreamsGA {
  createTime: string;
  displayName: string;
  name: string;
  type: string;
  updateTime: string;
  webStreamData?: {
    defaultUri: string;
    firebaseAppId: string | null;
    measurementId: string;
  };
}

export enum KeyStepConnectGoogle {
  disConnected = 0,
  connected = 1,
}

export enum KeyStepGA {
  disConnectedGA = 0,
  connectedGA = 1,
  connectedFinish = 2,
}

export interface IResponseOverViewReport {
  rowCount: number | null;
  rows?: IDataRecordRowOverViewReport[];
  totals?: IDataRecordTotalOverViewReport[];
  metricHeaders: { name: string; type: string }[];
  dimensionHeaders: { name: string; type: string }[];
}

export interface IDataRecordRowOverViewReport {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}
export interface IDataRecordTotalOverViewReport {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
}


// end smart booster
