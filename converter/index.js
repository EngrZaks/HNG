const { table } = require("console");
const fs = require("fs");
const csv = fs.readFileSync("./NFT.csv");
var arr = csv.toString().split("\r");

let result = [];
let headers = arr[0].split(", ");
// console.log(headers);

// looping from n-1 row, i.e. without the headers
for (let i = 0; i < arr.length - 1; i++) {
  let obj = {},
    str = arr[i],
    s = "",
    flag = 0;
  for (const ch of str) {
    if ((ch === "") & (flag === 0)) {
      flag = 1;
    } else if (ch === '"' && flag === 1) flag = 0;
    if (ch === ", " && flag === 0) ch = "|";
    if (ch !== '"') s += ch;
  }

  let properties = s.split("|");
  for (const j in headers) {
    if (properties[j].includes(", ")) {
      obj[headers[j]] = properties[j].split(", ").map((item) => item.trim());
    } else obj[headers[j]] = properties[j];
  }
  result.push(obj);
}
let json = JSON.stringify(result);
console.table(json);
fs.writeFileSync("output.json", json);
