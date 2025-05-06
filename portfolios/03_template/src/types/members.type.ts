// 유저 정보 조회
export interface MemberInfoProps {
  idx?: string;
  stats_load?: 0 | 1;
  stats_virtual_load?: 0 | 1;
  stats_date_start?: number;
  stats_date_end?: number;
}
