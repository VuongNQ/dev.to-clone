/*
interface CategoryMotoBycle {
    name: string;
    phankhoi: number | string;
}

interface ListCateGory {
    type: CategoryMotoBycle;
    dataBuy: string;
}


const cateMotoSirus: CategoryMotoBycle = {
    name: "Sirus Màu đỏ",
    phankhoi: 437238e232
}

const cateMotoWave: CategoryMotoBycle = {
    name: "Wave màu trắng",
    phankhoi: 234020323
}

export const list: Array<ListCateGory> = [
    {
        type: cateMotoSirus,
        dataBuy: "20/1/2004"
    },
    {
        type: cateMotoSirus,
        dataBuy: "9/10/4632"
    },
    {
        type: cateMotoWave,
        dataBuy: "20/1/1988"
    },
]
*/

/*
interface Food {
    name: string;
    soluong: number;
}

interface ListFood {
    type: Food;
    dataBuy: string;
}

interface Dodanghet extends ListFood {
    age: number
}

interface Addthem extends Dodanghet {
    police: string

}

const categoryHaisan: Food = {
    name: "Mực nhà làm rất tốt",
    soluong: 1000,
}

const categoryBT: Food = {
    name: "Liet ke la đung",
    soluong: 1000,
}
const categoryKemLanh: Food = {
    name: "Kem nong Da lat",
    soluong: 1000
}

const List: Addthem[] = [
    {
        type: categoryHaisan,
        dataBuy: "24/1/2024",
        age: 2222,
        police: "number"
    },
    {
        type: categoryBT,
        dataBuy: "20/2/2005",
        age: 333,
        police: "number"
    },
    {
        type: categoryHaisan,
        dataBuy: "20/3/2006",
        age: 5400,
        police: "number"

    },
    {
        type: categoryKemLanh,
        dataBuy: "20/1/2010",
        age: 1000,
        police: "number"
    }
]

export default List;

*/
class Person {
    readonly name: string; // This property is immutable - it can only be read
    private isCool: boolean; // Can only access or modify from methods within this class
    protected email: string; // Can access or modify from this class and subclasses
    public pets: number; // Can access or modify from anywhere - including outside the class
  
    constructor(n: string, c: boolean, e: string, p: number) {
      this.name = n;
      this.isCool = c;
      this.email = e;
      this.pets = p;
    }
  
    sayMyName() {
      console.log(`Your not Heisenberg, you're ${this.name}`);
    }
  }
  const person1 = new Person('Danny', false, 'dan@e.com', 1);
  console.log(person1.name); // Fine)
