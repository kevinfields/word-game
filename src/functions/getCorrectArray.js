export default function getCorrectArray(guess, correct) {
  let gArr = guess.split("");
  let cArr = correct.split("");
  let rArr = [];
  let greenArr = [];

  for (let i = 0; i < gArr.length; i++) {
    if (gArr[i] === cArr[i]) {
      rArr[i] = "greenbox";
      greenArr.push(i);
    }
  }

  for (let i = 0; i < gArr.length; i++) {
    if (rArr[i] === "greenbox") {
      continue;
    } else if (cArr.includes(gArr[i]) && !greenArr.includes(i)) {
      rArr[i] = "yellowbox";
    } else {
      rArr[i] = "redbox";
    }
  }

  return rArr;
}
