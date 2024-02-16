export enum ESegmentOnboarding {
  tutor_started = "Tutor Started",
  tutor_completed = "Tutor Completed",
}

export interface PostSegmentPageViewTypeParams {
  path: string;
  referrer: string;
  search: string;
  title: string;
  url: string;
}
