type Images = {
    logo?: "resized_logo_UQww2soKuUsjaOGNB38o.png" | "undefined"
}

export const Image = (img: Images) => {
    return (
        <div>
            {img.logo}
        </div>
    )
}