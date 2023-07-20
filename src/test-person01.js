// __dirname: 這支 js 所在的路徑
const Person = require(__dirname + "/person");
const Person2 = require("./person");

const p1 = new Person("Bill", 24);
const p2 = new Person2("David", 25);

console.log(Person === Person2);
console.log(p1.getInfo());
console.log(p2.getInfo());
