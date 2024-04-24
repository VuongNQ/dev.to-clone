import LastestListNew from "./component/lastestLisNew";
import LatestPerson from "./component/lastestPerson";
import LatestHeaderContent from './component/latestHeaderContent';
import LatestPersonDiv from "./component/latestPersonDiv";

function Latest() {
  return (
    <LatestHeaderContent>
      <LastestListNew/>
      <LatestPerson/>
      <LatestPersonDiv/>
      <LastestListNew/>
      <LastestListNew/>
      </LatestHeaderContent>
  );
}

export default Latest;