type Example23 = {
    name: {
        name: string
        age: string
        listing: string

    }
}

export const Example2 = (props: Example23) => {
    return (
        <div>
            {props.name.age}
            {props.name.name}
            {props.name.listing}
        </div>
    )
}