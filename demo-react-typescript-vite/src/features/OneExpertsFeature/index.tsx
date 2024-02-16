import { Card, Page } from "@shopify/polaris";
import iconSuccess from "@swift/assets/svg/modal/icon-success.svg";
import ModalHireExpert from "@swift/components/ModalHireExpert";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import TabsPolaris from "@swift/components/UIs/TabsGeneral/TabsPolaris";
import { BREADCRUMB_ONE_EXPERTS } from "@swift/constants/constantBreadcrumb";
import { useAppSelector } from "@swift/hooks";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import { queryKeys } from "@swift/queryKeys";
import { useOneExpertService } from "@swift/services/oneExpertApi";
import { usePortalService } from "@swift/services/portalApi";
import { customerData } from "@swift/store/global";
import { ListTicket } from "@swift/types/oneExperts";
import { useQuery } from "@tanstack/react-query";
import Parse from "html-react-parser";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import CheckUpExpertCare from "./components/CheckUpExpertCare";
import OneExpertsPage from "./components/OneExpertsPage";
import TicketManagement from "./components/TicketManagement";
import { INIT_DATA_PORTAL, PortalContext } from "./contexts/PortalContext";
import "./styles.scss"

function OneExpertsFeature() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const customer = useAppSelector(customerData);

  const { getTokenPortal } = usePortalService();

  const { getRecordTickets } = useOneExpertService();

  const {
    isOpen: isOpenHireExperts,
    onClose: onCloseHireExperts,
    onOpen: onOpenHireExperts,
  } = useDisclosure({ defaultIsOpen: false });

  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure({ defaultIsOpen: false });

  const [totalNumberTicket, setTotalNumberTicket] = useState<number>(0);

  const [infoPortal, setInfoPortal] = useState(INIT_DATA_PORTAL);

  const { isInitialLoading } = useQuery({
    ...queryKeys.portal.getTokenPortal(),
    enabled: customer ? true : false,
    queryFn: async () => {
      const { data, status } = await getTokenPortal();
      if (status) {
        setInfoPortal(data);
      }
      return data;
    },
  });

  const { data: listRecordTicket, refetch: refetchRecordTicket } = useQuery({
    ...queryKeys.oneExpertsQueryKey.getRecordTickets(),
    queryFn: async () => {
      const { data, status } = await getRecordTickets();

      if (status && data) {
        handleTotalTicket(data);
      }
      return data;
    },
  });

  const handleTotalTicket = useCallback((listTicket: Array<ListTicket>) => {
    const arrNumberTicket = listTicket.map((item) =>
      item.status !== 4 ? item.count : 0
    );
    const totalTicket = arrNumberTicket.reduce((a, b) => a + b, 0);

    setTotalNumberTicket(totalTicket);
  }, []);

  const TABS_BASE = [
    {
      id: "Services-2",
      content: t("one_expert_page.tabs.0"),
      accessibilityLabel: "Services",
      panelID: "Services-content-2",
      tabs: "one-expert",
      component: <OneExpertsPage openModalHireExpert={onOpenHireExperts} />,
    },
    {
      id: "My-ticket-2",
      content: `${t("one_expert_page.tabs.2")} (${totalNumberTicket})`,
      panelID: "My-ticket-content-2",
      tabs: "ticket",
      component: (
        <TicketManagement
          listRecordTicket={listRecordTicket || []}
          openModalHireExpert={onOpenHireExperts}
        />
      ),
    },
    {
      id: "Expert-Care",
      content: t("one_expert_page.tabs.3"),
      panelID: "expert-care-content-2",
      tabs: "expert-care",
      component: <CheckUpExpertCare />,
    },
  ];

  const handleOpenModalSuccess = useCallback(() => {
    const querySuccess = searchParams.get("success");
    if (!querySuccess) return;

    if (querySuccess === "true") {
      searchParams.delete("success");
      setSearchParams(searchParams);
      onOpenModal();
    }
  }, [searchParams]);

  useEffect(() => {
    const nameTabs = searchParams.get("tabs");
    if (searchParams.has("tabs") && nameTabs === "ticket") {
      refetchRecordTicket();
      handleOpenModalSuccess();
    }

  }, [searchParams]);

  return (
    <>
      <Breadcrumb listBreadcrumb={BREADCRUMB_ONE_EXPERTS} />
      <PortalContext.Provider
        value={{
          infoPortal: infoPortal,
          isLoading: isInitialLoading,
          setInfoPortal: setInfoPortal,
        }}
      >
        <Page
          title={t("one_expert_page.title")}
          subtitle={t("one_expert_page.des")}
        >
          <div className="OneExpertsFeature">
            <Card padding="0">
              <TabsPolaris
                listTabs={TABS_BASE}
                urlRedirect="/one-experts?tabs="
                paramsQuery="tabs"
                isUseSearchParams
              />
            </Card>
          </div>
          <ModalHireExpert
            isOpen={isOpenHireExperts}
            onClose={onCloseHireExperts}
          />
        </Page>
      </PortalContext.Provider>
      {/* modal charge ticket success*/}
      <ModalBaseInfo
        isOpenModal={isOpenModal}
        icon={iconSuccess}
        title_header={t("one_expert_page.modal_title_header")}
        des={Parse(t("one_expert_page.modal_des"))}
        titlePrimaryAction={t("common.btn_got_it")}
        onPrimaryAction={onCloseModal}
        title={t("one_expert_page.modal_title")}
        onSecondaryAction={onCloseModal}
        onCloseAction={onCloseModal}
      />
    </>
  );
}

export default OneExpertsFeature;
