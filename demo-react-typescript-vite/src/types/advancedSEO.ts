export interface IDataSitemap {
  [IKeyInfoSitemap.isConnected]: IKeyStatusConnectSitemap;
  [IKeyInfoSitemap.verifiedSite]: string | null;
  [IKeyInfoSitemap.isVerified]: IKeyStatusConnectSitemap;
  [IKeyInfoSitemap.isSubmitted]: IKeyStatusConnectSitemap;
}

export enum IKeyInfoSitemap {
  isConnected = "is_connected",
  verifiedSite = "verified_site",
  isVerified = "is_verified",
  isSubmitted = "is_submitted",
}

export enum IKeyStatusConnectSitemap {
  connected = 1,
  dis_connected = 0,
}

export interface IDataConnectGoogle {
  redirect_url: string;
}