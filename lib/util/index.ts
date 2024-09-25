/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: zenghaoming
 * @Date: 2024-09-25 12:57:47
 * @LastEditors: zenghaoming
 * @LastEditTime: 2024-09-25 13:16:54
 */
// 洗牌算法，随机打乱数组
export const shuffle = (arr: Array<any>) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = itemAtIndex;
  }
  return arr;
};

// 生成ID随机字符串
export const randomStr: any = (len = 6) =>
  Math.random()
    .toString(36)
    .slice(2, len + 2)
    .padEnd(len, Math.floor(Math.random() * 10) + '');

// 生成ID
export const createId = (group = 3, len = 6) => {
  // 当前时间戳转36字符 + 随机生成的5位36进制字符 + 随机生成的5位36进制字符
  let arr = [Date.now().toString(36)];
  for (let i = group - 1; i >= 0; i--) {
    arr.push(randomStr(len));
  }
  // 重新打乱数组顺序
  arr = shuffle(arr);
  //
  return arr.join('-');
};
