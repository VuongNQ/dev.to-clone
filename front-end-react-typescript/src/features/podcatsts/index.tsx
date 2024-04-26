import Header from "@/component/UI/GlobalStyle/defaultLayout.tsx/header";
import Container from "react-bootstrap/esm/Container";
import ListPodcasts from "./component/ListPodcasts";

function Podcasts() {
  return (
    <>
      <Header />
      <Container>
        <ListPodcasts />
      </Container>
    </>
  );
}

export default Podcasts;