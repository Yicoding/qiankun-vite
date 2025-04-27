import { http } from '@/services/request';
import type { UserInfo } from '@/utils/types';

const { VITE_ORIGIN } = import.meta.env;

/** h5获取用户信息接口 */
export const queryUserInfo = () => {
  const url = `${VITE_ORIGIN}/xxxx/user/info`;
  return http.get<UserInfo>(url);
};

