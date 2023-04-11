import {
  regExp3Digits,
  regExp4Digits,
  regExp5Digits,
  regExp6Digits,
  regExpLongDigits,
  regExp0x,
  regExpSpecial,
  RegExpObj,
} from "./regExp";

const regExpMap = {
  3: regExp3Digits,
  4: regExp4Digits,
  5: regExp5Digits,
  6: regExp6Digits,
};

export default function detectPatterns(name: string): Set<string> {
  if (!name.toLowerCase().endsWith(".bit")) {
    throw new Error("invalid name");
  }
  const value: string = name.slice(0, -4).toLowerCase();
  const isNumber: boolean = Number.isInteger(+value);
  let result: Set<string> = new Set();

  switch (true) {
    case value.startsWith("0x"):
      result = matchRegExp(value, regExp0x);
      break;
    case value.length >= 3 && value.length <= 6 && isNumber:
      const regExp = regExpMap[value.length];
      result = matchRegExp(value, regExp);
      break;
    case value.length > 6 && isNumber:
      result = matchRegExp(value, regExpLongDigits);
      break;
    default:
      result = matchRegExp(value, regExpSpecial);
  }
  console.log(result);
  return result;
}

function matchRegExp(value: string, regExpObj: RegExpObj): Set<string> {
  const result: Set<string> = new Set();
  for (let key in regExpObj) {
    if (regExpObj[key].test(value)) result.add(key);
  }
  return result;
}
