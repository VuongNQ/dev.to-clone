interface Name {
    title: string
}

export const  Example = (n : Name) => {
    const {title = "alo"} = n
    return (
        <div>{n.title}</div>
    ) 
}