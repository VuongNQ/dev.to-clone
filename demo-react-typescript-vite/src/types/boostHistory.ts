export enum ActionBoost {
  manual = "manual",
  auto = "auto",
}

export enum StatusActionBoost {
  success = 1,
}

export interface IDataBoostHistory {
  id: number;
  type: ActionBoost;
  status: StatusActionBoost;
  updated_at: string;
}
