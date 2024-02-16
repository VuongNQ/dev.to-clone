import { StatusScanSEOType } from "./boostSEO";

export interface IDataLogSpeed {
    score: number;
    status: StatusScanSEOType;
    updated_at?: string;
    cumulative_layout_shift: number;
    first_contentful_paint: number;
    largest_contentful_paint: number;
}

export interface IResponseLogSpeed extends Pick<IDataLogSpeed, "score" | "status" | "updated_at"> {
    id: number;
    store_id: number;
    created_at: string;
    data: Pick<IDataLogSpeed, "cumulative_layout_shift" | "first_contentful_paint" | "largest_contentful_paint"> & {
        audits: [];
        speed_index: number;
        total_blocking_time: number;
    };
}
