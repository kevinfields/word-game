export default function formatTime(s) {
  let str = s.toString();
  let arr = str.split("");

  for (let i = 9; i < arr.length; i++) {
    arr[i] = 0;
  }

  let newStr = arr.join("");

  let x = Number(newStr);
  let time = new Date(x).toLocaleString("en-US", { timeZone: "CST" });

  let briefArr = time.split("");
  const cutIndex = briefArr.lastIndexOf(":");
  briefArr.splice(cutIndex, 3);
  time = briefArr.join("");
  return time;
}
