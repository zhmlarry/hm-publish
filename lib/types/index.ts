/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: zenghaoming
 * @Date: 2023-11-02 11:26:01
 * @LastEditors: zenghaoming
 * @LastEditTime: 2024-04-10 09:52:18
 */
// 函数
export type fnType<T = any, K = any> = (data: T) => K;
// event数组里的对象
export interface _EventObjType<T = any> {
  id: string;
  fn: fnType<T>;
  once?: boolean;
  des?: string;
}

// event类型
export interface _EventInterface<T = any> {
  [key: string]: Array<_EventObjType<T[keyof T]>>;
}

// 构造函数的参数
export interface ConstructorProps<T = any> {
  event: { [key: string]: Array<_EventObjType<T>> };
}
// 订阅方法的返回类型
export interface SubscribeReturn {
  id: string;
  success: boolean;
}
