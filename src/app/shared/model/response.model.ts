export class ResponseModel {
  description(description: any) {
	  throw new Error("Method not implemented.");
  }
  status: boolean;
  message?: string;
  data?: {} | [] | any;
  pageLimit?: number;
  pageTotal?: number;
  currentPage?: number;
  recordTotal?: number;
  errorCode?: any;
}
