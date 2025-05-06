import moment from "moment";
import { filterData, parseArr, parseBool, parseIdx, parseNum, parseStr } from "../utils/parse.util";

export abstract class BaseModel {
  parseData(data: any): void {
    if (data) {
      data = filterData(data);
      Object.assign(this, data);
    }
    
    for (const key in this) {
      const value = this[key as keyof this];

      if (typeof value === "string" && key.toLowerCase().includes("idx")) {
        this[key as keyof this] = parseIdx(value) as any;
      }
      else if (typeof value === "string" && key.toLowerCase().includes("date_")) {
        this[key as keyof this] = value ? moment(value).format("YYYY-MM-DD HH:mm:SS") as any : "";
      }
      else if (typeof value === "string") {
        this[key as keyof this] = parseStr(value) as any;
      }
      else if (typeof value === "number") {
        this[key as keyof this] = parseNum(value) as any;
      }
      else if (typeof value === "boolean") {
        this[key as keyof this] = parseBool(value) as any;
      }
      else if (Array.isArray(value)) {
        this[key as keyof this] = parseArr(value) as any;
      }
    }
  }
}

// 데이터 상세 내용 관련
export class CommonFileData extends BaseModel {
  date_active: string = "";
  date_delete: string = "";
  file_ext: string = "";
  file_name_origin: string = "";
  file_name_real: string = "";
  file_path: string = "";
  file_size: number = 0;
  file_type: number = 0;
  file_url: string = "";
  idx: string = "00000000-0000-0000-0000-000000000000";
  is_active: number = 0;
  member_idx: string = "00000000-0000-0000-0000-000000000000";
  permit_level: number = 0;

  constructor(data?: any) {
    super();
    this.parseData(data);
  }
}

export class CommonMember extends BaseModel {
  idx: string = "00000000-0000-0000-0000-000000000000";
  member_birthday: number = 0;
  member_id: string = "";
  member_name: string = "";
  member_public_extras: string = "";

  constructor(data?: Partial<CommonMember>) {
    super();
    this.parseData(data);
  }
}

// /데이터 상세 내용 관련

// response 관련
export class CommonResponse {
	// debug: CommonDebug = new CommonDebug();
	error: string = "";
	message: string[] | [] = [];
	statusCode: number = 0;

  constructor(data?: any) {
    this.error = parseStr(data?.error);
    this.message = parseArr(data?.message);
    this.statusCode = parseNum(data?.statusCode);
  }
};

export class CommonDataResponse<T> extends CommonResponse {
  data: T = {} as T;

  constructor(
    responseData?: Partial<CommonDataResponse<T>>, 
    DataClass?: new (d?: Partial<T>) => T
  ) {
    super(responseData);

    this.data = DataClass 
      ? new DataClass(responseData?.data) 
      : (responseData?.data as T);
  }
}