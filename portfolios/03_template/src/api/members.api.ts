import API_URL from "../constants/apiUrl.const";
import { CommonResponse } from "../dtos/common.dto";
import { MemberInfoData, MemberInfoResponnse, MemberLoginData, MemberLoginResponse, MemberSignupData } from "../dtos/member.dto";
import { MemberInfoProps } from "../types/members.type";
import { apiService } from "./apiService";

export const memberLogin = async (data: MemberLoginData): Promise<MemberLoginResponse> => {
  const response = await apiService.post<MemberLoginResponse>(
    `${API_URL.MEMBERS}/login`,
    data,
    MemberLoginResponse
  );
  return response;
};

export const memberInfo = async (params: MemberInfoProps): Promise<MemberInfoResponnse> => {
  const response = await apiService.getData<MemberInfoData>(
    `${API_URL.MEMBERS}/info`, 
    params, 
    MemberInfoData
  );
  return response;
};