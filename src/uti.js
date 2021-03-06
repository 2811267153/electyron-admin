export function getNowFormatDate() {
  let date = new Date()
  let strMonth = date.getMonth() + 1
  let strDate = date.getDate()
  let strHour = date.getHours()
  let strMin = date.getMinutes()
  let strSec = date.getSeconds()
  if (strMonth >= 1 && strMonth <= 9) {
    strMonth = '0' + strMonth
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = '0' + strHour
  }
  if (strMin >= 0 && strMin <= 9) {
    strMin = '0' + strMin
  }
  if (strSec >= 0 && strSec <= 9) {
    strSec = '0' + strSec
  }
  let currentTime =
    date.getFullYear() +
    '-' +
    strMonth +
    '-' +
    strDate +
    ' ' +
    strHour +
    ':' +
    strMin +
    ':' +
    strSec
  return currentTime
}


//随机生成11位字符串
export function randomWord(randomFlag, min, max) {
  let str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];

  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;// 任意长度
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

//利用递归实现数组转树
export function  fn(data) {
  let map = {};
  let result = [];
  // 存映射，方便取值
  data.forEach((el) => {
    map[el.deptId] = el;
  });
  data.forEach((item) => {
    const father = map[item.parentId];
    if (father) {
      (father.children || (father.children = [])).push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

//菜单类型结构转树结构
export function menuToTree(data){
  let maps = {};
  let result = [];
  // 存映射，方便取值
  data.forEach((el) => {
    maps[el.menuId] = el;
  });
  data.forEach((item) => {
    const father = maps[item.parentId];
    if (father) {
      (father.children || (father.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

//属性结构平面化
export function treeToArray(tree){
    let queen = [];
    let out = [];
    queen = queen.concat(tree);
    while(queen.length) {
      const first = queen.shift();
      if (first.children) {
        queen = queen.concat(first.children)
        delete first['children'];
      }
      out.push(first);
    }
    return out;
}


export function formatDate(time) {
  let date = new Date(time);

  let YY = date.getFullYear();
  let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  // 这里修改返回时间的格式
  return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}
