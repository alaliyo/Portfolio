import { parseArr } from "../utils/parse.util";
import { BaseModel, CommonFileData, CommonGroupStats, CommonResponse } from "./common.dto";

// 회원 관련 공통 타입 정의
export class MemberData extends BaseModel {
  date_active: string = "";
	date_block: string = "";
  date_delete: string = "";
	date_login: string = "";
  date_lock: string = "";
  date_update: string = "";
	files: CommonFileData[] = [];
	idx: string = "00000000-0000-0000-0000-000000000000";
  is_active: number = 0;
  member_allow_ip: string = "";
  member_app_push: string = "";
  member_birthday: string = "";
  member_client_agent: string = "";
  member_client_app_version: string = "";
  member_client_model: string = "";
  member_client_os: string = "";
  member_client_os_version: string = "";
  member_email: string = "";
  member_id: string = "";
  member_locale: string = "";
  member_login_ip: string = "";
  member_name: string = "";
  member_permit_level: number = 0;
  member_phone: string = "";
  member_public_extras: string = "";
  member_type: number = 0;
	stats_date_start: number = 0;
  tags: string = "";
  tags_tsvector: string = "";

  constructor(data?: any) {
    super();
    this.parseData(data);
  }
}

export class MemberAuth extends BaseModel {
  access_token: string = "";
  access_token_expires_in: number = 0;
  refresh_token: string = "";
  refresh_token_expires_in: number = 0;
  session_expires_in: number = 0;
  use_session: number = 0;

  constructor(data?: any) {
    super();
    this.parseData(data);
  }
}


// 로그인 관련 타입 정의
export class MemberLoginData extends BaseModel {
	member_id: string = "";
	member_pw: string = "";
	member_type: number = 0;

  constructor(data?: any) {
    super();
    this.parseData(data);
  }
};

export class MemberLoginResponse extends CommonResponse {
	auth: MemberAuth = new MemberAuth();
  data: MemberData = new MemberData();

	constructor(postData?: any) {
		super(postData);
		this.auth = new MemberAuth(postData?.auth);
		this.data = new MemberData(postData?.data);
	}
};

// 유저 정보 조회
export class MemberInfoData extends MemberData {
  stats: CommonGroupStats[] = [];

  constructor(data?: Partial<MemberInfoData>) {
    super(data);
    this.stats = parseArr<CommonGroupStats>(data?.stats);
  }
}

export class MemberInfoResponnse extends CommonResponse {
  data: MemberInfoData = new MemberInfoData();

  constructor(data?: Partial<MemberInfoResponnse>) {
    super(data);
    this.data = new MemberInfoData(data?.data);
  }
}