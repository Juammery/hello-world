export let value630 = [
  { value: 1, label: "男" },
  { value: 2, label: "女" }
];
export function findDic(list) {
  list.forEach(element => {
    if (element.name == "性别") {
      value630.forEach(e => {
        if (e.label == element.data) {
          element.value = e.value;
        }
      });
    }
  });

  return list;
}
