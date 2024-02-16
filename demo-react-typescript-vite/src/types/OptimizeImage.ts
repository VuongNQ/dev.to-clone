export enum PusherEventImages {
	compress_images = "compress-images",
	optimize_end = "optimize_image_process",
	restore_images = "restore-images",
	restore_end = "restore_image_process",
	resync_images = "resync-images",
}
export enum PusherChannelImages {
	compress = "compress-images-channel-",
	restore = "restore-images-channel-",
	resync = "resymc-images-channel-",
}

export enum IStatusOptimizeImage {
	all = "all",
	new_up_load = "new_up_load",
	optimized = "optimized",
	restored = "restored",
	optimizing = "optimizing",
	restoring = "restoring",
	un_optimized = "un_optimized",
	failed = "failed",
}

export enum IOptimizeStatus {
	processing = "processing",
	done = "done",
}

export interface PusherOptimizeImages {
	storeId: string;
	// trường hợp images = 0  là số lượt optimize đã hết, hiện banner thông báo và update lại số lượt
	images: number;
	totalImages: number;
	logId: number; // mỗi lần optimize sẽ có 1 log ID, dựa theo log ID đó để biết đc tổng số hình trong 1 lần gọi API optimze
	// nếu dữ liệu là null thì đó là tín hiệu cuối cùng của lượt optimize dùng để đóng popup và thông báo
	optimizedImage: IDetailImageRaw | null;
	limitCompressImages: boolean;
}
export interface IPusherRestoreImageEnd{
	storeId:     string;
    imageNumber: number;
    totalImages: number;
    logId:       number;
    image:       IDetailImageRaw | null;
}

export interface IDetailImageRaw {
	id: number;
	log_id: number;
	store_id: number;
	image_id: string;
	type: string;
	type_id: string;
	title: string;
	src: string;
	size: string;
	old_src?: string;
	old_size?: string;
	status: IStatusOptimizeImage;
	alt?: string;
	modified_at: null;
	uploaded_at: null;
	deleted_at: null;
	created_at: Date;
	updated_at: Date;
	origin_size: string;
	optimized_size: string | null;
}

export interface IPusherProcessOptimizeData {
	storeId: string;
	optimizedImageNumber: number;
	totalImages: number;
	logId: number;
	optimizedImage: IOptimizedImage;
}

export interface IOptimizedImage {
	id: number;
	image_id: number;
	status: string;
}

export enum IFilterDay {
	all_time = 0,
	seven_day = 7,
	thirty_day = 30,
	ninety_day = 90,
	one_year = 365,
}

export interface ListJobOptimize {
	[key: string | number]: {
		total: number;
		images: number;
		isDone: boolean;
	};
}

export interface IPayloadGetListImage {
	page: number;
	filter: IFilterImage;
	limit?: number;
}

export interface IPayloadOptimizeImage {
	listImage: number[];
	level?: number;
	optimizeType?: IStatusOptimizeImage;
}

export interface IFilterImage {
    type: IFilterTypeImage;
    day: IFilterDay;
    status: IStatusOptimizeImage;
}

export enum IFilterTypeImage {
    all_type = 'all_type',
    product = 'product',
    collection = 'collection',
    article = 'article',
    asset = 'asset',
}



export enum EQueryKeyOptimizeImage {
    optimizeImage = "optimizeImage",
    getListImage = "getListImage",
	getOverView = "getOverView",
	getSettingOptimize = "getSettingOptimize"
}