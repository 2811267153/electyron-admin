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