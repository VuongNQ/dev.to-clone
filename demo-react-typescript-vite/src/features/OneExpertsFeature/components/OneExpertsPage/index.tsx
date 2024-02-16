/* Components */
import CustomersSay from "../CustomersSay";
import Experience from "../Experience";
import HireExperts from "../HireExperts";
import OneExpertsBanner from "../OneExpertsBanner";
import ProvenSpeedUp from "../ProvenSpeedUp";
import Questions from "../Questions";
import StoreSpeed from "../StoreSpeed";

import "./styles.scss";

const OneExpertsPage = ({
  openModalHireExpert,
}: {
  openModalHireExpert: () => void;
}) => {
  return (
    <div className="OneExpertPage flex flex-col gap-5 p-5">
      <OneExpertsBanner openModalHireExpert={openModalHireExpert} />
      <ProvenSpeedUp />
      <Experience />
      <StoreSpeed />
      <HireExperts openModalHireExpert={openModalHireExpert} />
      <CustomersSay />
      <Questions />
    </div>
  );
};

export default OneExpertsPage;
