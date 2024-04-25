import TopImage from './component/topImage';
import TopListNew from "./component/topListNew";
import TopPerson from "./component/topPerson";
import TopWrapper from './component/topWrapper';

function Top() {
  return (
    <TopWrapper>
      <TopImage />
      <TopPerson />
      <TopListNew />
      <TopListNew />
    </TopWrapper>
  );
}

export default Top;