/**check string in array */
export const isArrayContains = (arrhaystack: string[], needle: string) => {
    return arrhaystack.indexOf(needle) > -1;
};

export function returnArrayUniq(a: string[]) {
    return Array.from(new Set(a));
}

export function isExistInArray(element: string,arr: string[]) {
    return arr.includes(element) 
}
