export interface SwiftApiResponseBase {
    status: boolean;
    message?: string;
    error?:boolean ;
    sentryId?:string
    errors?:{
        type:string;
        optimize?:string
    } | [] ;
}
export interface SwiftApiResponse<T> extends SwiftApiResponseBase {
    data: T;
}
