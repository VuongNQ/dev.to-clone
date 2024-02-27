interface Name1 {
    name: string
    age: number
}

export const Examples1 = (prop: Name1) => {
   return (
    <div> {prop.name} {prop.age} </div>
   ) 
}