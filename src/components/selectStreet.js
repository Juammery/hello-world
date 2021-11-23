import Vue from "vue";

const streets = [
  { name: "X08", type: 1 },
  { name: "ZFHMJD01", type: 2 },
  { name: "ZFHMJD02", type: 2 },
  { name: "ZFHMJD03", type: 2 },
  { name: "ZFHMJD04", type: 2 },
  { name: "ZFXHJD01", type: 3 },
  { name: "ZFXHJD02", type: 3 },
  { name: "ZFXHJD03", type: 3 },
  { name: "ZFXHJD04", type: 3 }
];
export function SelectStreet() {
//   let street = Vue.prototype.getSession("ReceiveUrl").terminalCode;
  let street = Vue.prototype.getSession("terminalCode");
  let result = "3"; //默认为3
  streets.forEach((element, index) => {
    if (element.name == street) {
      result = element.type;
    }
  });
  return result;
}
// 判断是否是C厅
export function IsXuhui() {
  let street = Vue.prototype.getSession("terminalCode");
  let result = true; //默认是C厅
  streets.forEach(element => {
    if (element.name == street) {
      result = false;
    }
  });
  return result;
}
