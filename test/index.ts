/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: zenghaoming
 * @Date: 2023-12-20 10:17:42
 * @LastEditors: zenghaoming
 * @LastEditTime: 2024-09-25 13:02:18
 */
import HmPublish from "../lib/index";

//
import eventMap from "./config/eventMap";
import type { EventMapInterface } from "./types";

// 对象初始化
const hmPublish = new HmPublish<EventMapInterface>({
  event: eventMap,
});

//事件发布
hmPublish.subscribe("test", (data) => {
  console.log("test", data);
});

// 事件订阅
hmPublish.publish("test", { test: 1 });
