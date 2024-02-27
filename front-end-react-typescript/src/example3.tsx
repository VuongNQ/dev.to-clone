type PersonList = {
    names: {
        name: string
        date: string
       category: number
    }[]
    children: React.ReactNode
}

export const Example24 = (person: PersonList) => {
    return (
        <div>
            {person.children}
            {person.names.map(item => {
                return (
                    <ul key={item.name}>
                        <li>{item.name}</li>
                        <li>{item.date}</li>
                        <li>{item.category}</li>
                    </ul>
                )
            })}
        </div>
    )
}