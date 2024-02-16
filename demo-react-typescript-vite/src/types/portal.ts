export interface IDataGetTokenPortal {
  exp: number;
  token: string;
}

export interface PortalApiResponse <T>{
  message?: string;
  code: number;
  data:T
}
export interface PortalListCheckupLogExpertCare<T> extends PortalApiResponse <T>{
  totalItems: number;
  totalPages: number;
  type: number;
}

export interface IDataListCheckupLogExpertCare {
  id: number;
  assigneeFullName: string;
  updatedAt: string;
  status: ICheckupLogExpertCare;
  problems: string[];
}

export enum ICheckupLogExpertCare {
  awaiting = 1,
  monitoring = 2,
  delivered = 3,
  cancel = 4,
}


