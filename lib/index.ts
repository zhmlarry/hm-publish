/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: zenghaoming
 * @Date: 2023-04-21 14:10:04
 * @LastEditors: zenghaoming
 * @LastEditTime: 2024-09-25 12:57:23
 */
import { createId } from "./util/index";

import type {
  fnType,
  _EventObjType,
  _EventInterface,
  ConstructorProps,
  SubscribeReturn,
} from "./types";

export default class TwPublish<T> {
  private _event: _EventInterface<T>;
  //
  constructor(props: ConstructorProps<T[keyof T]>) {
    this._event = props.event || {}; // 做浅拷贝
  }
  // 事件的订阅
  public subscribe<K extends keyof T>(
    name: K,
    fn: fnType<T[K]>,
    config?: { once?: boolean; des?: string }
  ): SubscribeReturn {
    const _name = name as string;
    const { once = false, des = "" } = config || {};
    //
    if (!this._event[_name]) {
      // console.error(`${_name} 事件订阅失败，因为它不在事件 [` + Object.keys(this._event).join(',') + '] 范围内');
      return { id: "", success: false };
    }
    if (!this._event[_name]) {
      this._event[_name] = [];
    }
    const id = createId();
    this._event[_name].push({ id, fn: fn as any, once, des });
    return { id, success: true };
  }

  // 取消订阅
  public unsubscribe(name?: keyof T, id?: string) {
    const _name = name as string;
    if (!_name && !id) {
      // 都不传 则全部取消
      for (const key in this._event) {
        this._event[key] = [];
      }
      return;
    }
    // 传入名字
    if (_name && !id && this._event[_name]) {
      this._event[_name] = [];
      return;
    }
    // 都传入
    if (_name && id && this._event[_name]) {
      const arr = this._event[_name] || [];
      const index = arr.findIndex((item) => item.id === id);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      return;
    }
  }

  // 事件的执行
  public publish<K extends keyof T>(name: K, data?: T[K]) {
    const _name = name as string;
    if (!this._event[_name]) {
      // console.error(`${_name} 事件发布失败，因为它不在事件 [` + Object.keys(this._event).join(',') + '] 范围内');
      return;
    }
    const arr = this._event[_name] || [];
    //
    for (const item of arr) {
      const obj: _EventObjType = item;
      //
      obj && obj.fn && obj.fn(data || null);
      if (obj.once) {
        arr.splice(arr.indexOf(obj), 1); // 如果del属性为true，则从数组中删除该对象
      }
    }
  }
}
