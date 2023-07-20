class Person {
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
  
  // instance, 個體, 實體
  /*
  const p1 = new Person();
  const p2 = new Person("Peter", 26);
  
  console.log(p1.getInfo());
  console.log(p2.getInfo());
  console.log(p2.name);
  console.log(p2.age);
  */
  console.log("Person-----------");
  module.exports = Person; // cjs 匯出
  