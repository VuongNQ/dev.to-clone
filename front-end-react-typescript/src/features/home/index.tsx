import ContainerHome from "./componentHome/ContainerHome";
import HeaderContent from "./componentHome/HeaderContent";
import ListHome from "./componentHome/ListHome";
import ListPersonContent from "./componentHome/ListPersonHome";

function Home() {
  return (
    <ContainerHome>
      <HeaderContent />
      <ListHome />
      <ListPersonContent />
      <ListHome />
      <ListHome />
    </ContainerHome>
  );
}

export default Home;