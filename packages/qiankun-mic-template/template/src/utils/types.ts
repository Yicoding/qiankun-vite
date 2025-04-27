/** types */

/** native用户登录信息 */
export type UserInfo = {
  // -1（未发送请求）；0（请求返回未登录）；> 0（请求返回已登录）
  uid: number;
  // 是否登录
  isLogin: boolean;
  // 用户名
  nickName?: string;
  // 用户头像
  imgUrl?: string;
};

