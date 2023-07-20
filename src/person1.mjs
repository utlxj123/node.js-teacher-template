export default class Person {
  // 建構函式
  constructor(name = "noname", age = 18) {
    this.name = name;
    this.age = age;
  }

  // 個體的方法
  getInfo() {
    const { name, age } = this;
    return { name, age };
  }
}

export const n = 100;
export const f1 = (a) => a * a;
const m = 10;

export { m };

