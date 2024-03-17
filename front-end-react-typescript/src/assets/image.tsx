interface Image {
    src?: any
}

export const Img = (n: Image) => {
  return (
    <img src={n.src}  />
  )
}