export const discountNumber = (price: number, discount: number) => {
    const numberDiscount = Math.floor(price - (price * (discount / 100)));

    return numberDiscount
};


export const handleTotalPriceByPercenNumber = (
    number: number,
    percen: number,
    n = 2
) => {
    const base = 10 ** n;
    const total =
        parseFloat(`${number}`) -
        (parseFloat(`${number}`) * parseFloat(`${percen}`)) / 100;
    const result = Math.round(total * base) / base;
    return result;
};


export const percentNumberNumberAndTotal = (number:number,total:number) =>{
return Math.floor((number/total)*100)
}

export const generateRandomInteger = (max:number) => {
    return Math.floor(Math.random() * max) + 1;
}