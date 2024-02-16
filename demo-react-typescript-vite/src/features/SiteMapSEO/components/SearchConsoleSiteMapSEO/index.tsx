import { SkeletonBodyText, Toast } from "@shopify/polaris";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import { MESSAGE_PLAN_NOT_USE } from "@swift/constants/general";
import { useAppSelector } from "@swift/hooks";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { queryKeys } from "@swift/queryKeys";
import { useAdvancedSEOService } from "@swift/services/advancedSEOApi";
import { customerData } from "@swift/store/global";
import {
  IDataSitemap,
  IKeyInfoSitemap,
  IKeyStatusConnectSitemap,
} from "@swift/types/advancedSEO";
import { PlanType } from "@swift/types/planPricing";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  ACCEPT_PLANS_SITEMAP,
  INIT_DATA_SITE_MAP,
  LIST_STEP_CONNECT_SITEMAP,
  MESSAGE_GOOGLE_SEARCH_CONSOLE,
  MESS_DISCONNECTED,
} from "../../constants";
import { useSettingSitemap } from "../../hooks/useSettingSitemap";
import CollapsibleSubmitSiteMap from "../CollapsibleSubmitSiteMap";
import ItemStepSubmitSiteMap from "../ItemStepSubmitSiteMap";
import SectionUpGradePlan from "../SectionUpGradePlan";
import { useToastGeneral } from "@swift/hooks/useToastGeneral";

function SearchConsoleSiteMapSEO() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const {
    getDetailSitemap,
    oauthGoogle,
    addSite,
    verifySiteOwnership,
    submitSitemap,
    disconnectSearchConsole,
  } = useAdvancedSEOService();

  const [searchParams, setSearchParams] = useSearchParams();

  const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

  const customer = useAppSelector(customerData);

  const { toastInfo, toggleIsOpenToast } = useToastGeneral();

  const {
    isOpenModal,
    modalSetting,
    onCloseModal,
    onOpenModal,
    setModalSetting,
    returnModalDisconnect,
    handleReturnCountTaskComplete,
    handleActionStepError,
    openModalCheckPlan,
  } = useSettingSitemap();

  const planCurrent = useMemo(
    () => customer?.app_plan || PlanType.free,
    [customer?.app_plan]
  );

  const isAcceptPlanCurrent = useMemo(
    () => isExistInArray(planCurrent, ACCEPT_PLANS_SITEMAP),
    [planCurrent]
  );

  const [numberTaskComplete, setNumberTaskComplete] = useState<number>(0);

  const { data: infoSitemapState, isInitialLoading } = useQuery({
    ...queryKeys.advancedSeo.getDetailSitemap(),
    refetchOnWindowFocus: false,
    enabled: isAcceptPlanCurrent,
    queryFn: async () => {
      const { data, status } = await getDetailSitemap();
      if (status && data) {
        return data;
      }
      return INIT_DATA_SITE_MAP;
    },
  });

  const { URL_ROOT_APP } = usePlanPricing({});

  const { mutate: onConnectGoogle, isLoading: isLoadingOnConnectGoogle } =
    useMutation({
      mutationFn: async () => {
        const urlRedirectApp = `${URL_ROOT_APP}/seo-advanced?tabs=site_map&connect=true`;

        return await oauthGoogle({
          path: urlRedirectApp,
        });
      },
      onSuccess: (res) => {
        const { data, status } = res;
        if (status && data) {
          onRedirectRemoteCurrentTabs(data.redirect_url);
        }
      },
    });

  const { mutate: onAddSite, isLoading: isLoadingOnAddSite } = useMutation({
    mutationFn: async () => {
      return await addSite();
    },
    onSuccess: (res) => {
      const { data, status, message, sentryId } = res;

      if (status && data) {
        handleUpdateDataSiteMap({
          key: IKeyInfoSitemap.verifiedSite,
          value: "nameStore",
        });
        toggleIsOpenToast({
          isOpen: true,
          message: t(MESSAGE_GOOGLE_SEARCH_CONSOLE.verified_site),
        });
      } else {
        handleActionStepError({
          errorID: sentryId,
          message: message,
          title_header: t("modal.sitemap.task_add_site_error.title_header"),
          plan: planCurrent,
        });
      }
    },
  });

  const {
    mutate: onVerifySiteOwnership,
    isLoading: isLoadingOnVerifySiteOwnership,
  } = useMutation({
    mutationFn: async () => {
      return await verifySiteOwnership();
    },
    onSuccess: (res) => {
      const { data, status, message, sentryId } = res;

      if (status && data) {
        handleUpdateDataSiteMap({
          key: IKeyInfoSitemap.isVerified,
          value: IKeyStatusConnectSitemap.connected,
        });
        toggleIsOpenToast({
          isOpen: true,
          message: t(MESSAGE_GOOGLE_SEARCH_CONSOLE.is_verified),
        });
      } else {
        handleActionStepError({
          errorID: sentryId,
          message: message,
          title_header: t("modal.sitemap.task_verify_site_error.title_header"),
          plan: planCurrent,
        });
      }
    },
  });

  const { mutate: onSubmitSitemap, isLoading: isLoadingOnSubmitSitemap } =
    useMutation({
      mutationFn: async () => {
        return await submitSitemap();
      },
      onSuccess: (res) => {
        const { data, status, message, sentryId } = res;

        if (status && data) {
          handleUpdateDataSiteMap({
            key: IKeyInfoSitemap.isSubmitted,
            value: IKeyStatusConnectSitemap.connected,
          });
          toggleIsOpenToast({
            isOpen: true,
            message: t(MESSAGE_GOOGLE_SEARCH_CONSOLE.is_submitted),
          });
        } else {
          const titleHeader = sentryId
            ? t("modal.sitemap.task_submit_sitemap_error.title_header_try")
            : t("modal.sitemap.task_submit_sitemap_error.title_header_cant");

          handleActionStepError({
            errorID: sentryId,
            message: message,
            title_header: titleHeader,
            plan: planCurrent,
          });
        }
      },
    });

  const {
    mutate: onDisconnectSearchConsole,
    isLoading: isLoadingOnDisconnectSearchConsole,
  } = useMutation({
    mutationFn: async () => {
      return await disconnectSearchConsole();
    },
    onSuccess: (res) => {
      const { status, message } = res;

      if (status) {
        handleUpdateDataSiteMap({
          isReset: true,
        });
      } else {
        //check user disconnect 2 tabs
        const isDisConnected =
          message &&
          message
            .toLocaleLowerCase()
            .includes(MESS_DISCONNECTED.toLocaleLowerCase())
            ? true
            : false;

        if (isDisConnected) {
          handleUpdateDataSiteMap({
            isReset: true,
          });
          return;
        }
        //end check user disconnect 2 tabs

        // check plan not use feature
        const isPlanNotUse =
          message &&
          message
            .toLocaleLowerCase()
            .includes(MESSAGE_PLAN_NOT_USE.toLocaleLowerCase())
            ? true
            : false;

        if (isPlanNotUse) {
          openModalCheckPlan(planCurrent);
          return;
        }
        // end check plan not use feature
      }
    },
  });

  const handleUpdateDataSiteMap = useCallback(
    ({
      key,
      value,
      isReset,
    }: {
      key?: keyof IDataSitemap;
      value?: IDataSitemap[keyof IDataSitemap];
      isReset?: boolean;
    }) => {
      queryClient.setQueryData<IDataSitemap>(
        queryKeys.advancedSeo.getDetailSitemap().queryKey,
        (oldData) => {
          if (isReset) return INIT_DATA_SITE_MAP;
          if (!oldData || !key || !value) return oldData;

          let newData = oldData;
          newData = {
            ...newData,
            [key]: value,
          };

          return newData;
        }
      );
    },
    [queryClient]
  );

  /** set loading when click Step */
  const handleClickStep = useCallback(
    async (key: IKeyInfoSitemap) => {
      if (key === IKeyInfoSitemap.isConnected) {
        onConnectGoogle();
      }

      if (key === IKeyInfoSitemap.verifiedSite) {
        onAddSite();
      }

      if (key === IKeyInfoSitemap.isVerified) {
        onVerifySiteOwnership();
      }

      if (key === IKeyInfoSitemap.isSubmitted) {
        onSubmitSitemap();
      }
    },
    [onAddSite, onConnectGoogle, onSubmitSitemap, onVerifySiteOwnership]
  );
  /**end set loading when click Step */

  /** disconnect Google Search Console*/
  const onConfirmDisconnectSearchConsole = useCallback(() => {
    const contentModal = returnModalDisconnect();
    setModalSetting({
      ...contentModal,
      onPrimaryAction: () => {
        onDisconnectSearchConsole();
        onCloseModal();
      },
    });
    onOpenModal();
  }, [
    onCloseModal,
    onDisconnectSearchConsole,
    onOpenModal,
    returnModalDisconnect,
    setModalSetting,
  ]);

  /** Update number task complete */
  useEffect(() => {
    if (!infoSitemapState) return;
    const taskComplete = handleReturnCountTaskComplete(infoSitemapState);
    setNumberTaskComplete(taskComplete);
  }, [infoSitemapState]);
  /** end Update number task complete */

  /** show toast Connect to Google Search Console */
  useEffect(() => {
    if (searchParams.has("connect")) {
      const value = searchParams.get("connect");

      if (value === "true") {
        toggleIsOpenToast({
          isOpen: true,
          message: t(MESSAGE_GOOGLE_SEARCH_CONSOLE.is_connected),
        });
      }
    }
  }, [searchParams]);
  /** end show toast Connect to Google Search Console */

  /** disable button step */
  const isDisabledBtnStep = useCallback(
    (payload: { key: IKeyInfoSitemap; data: IDataSitemap }) => {
      const { key, data } = payload;

      if (key === IKeyInfoSitemap.verifiedSite) {
        return !data.is_connected;
      }

      if (key === IKeyInfoSitemap.isVerified) {
        return !data.verified_site?.length;
      }

      if (key === IKeyInfoSitemap.isSubmitted) {
        return !data.is_verified;
      }
      return false;
    },
    []
  );
  /**end disable button step */

  /** loading button step */
  const isLoadingBtnStep = useCallback(
    (payload: { key: IKeyInfoSitemap }) => {
      const { key } = payload;

      if (key === IKeyInfoSitemap.isConnected) {
        return isLoadingOnConnectGoogle;
      }

      if (key === IKeyInfoSitemap.verifiedSite) {
        return isLoadingOnAddSite;
      }

      if (key === IKeyInfoSitemap.isVerified) {
        return isLoadingOnVerifySiteOwnership;
      }

      if (key === IKeyInfoSitemap.isSubmitted) {
        return isLoadingOnSubmitSitemap;
      }
      return false;
    },
    [
      isLoadingOnConnectGoogle,
      isLoadingOnAddSite,
      isLoadingOnVerifySiteOwnership,
      isLoadingOnSubmitSitemap,
    ]
  );
  /**end loading button step */

  const displaySteps = useMemo(
    () =>
      infoSitemapState ?
      Object.keys(LIST_STEP_CONNECT_SITEMAP).map((key, index) => {
        const dataStep = infoSitemapState[key as IKeyInfoSitemap];
        const step = LIST_STEP_CONNECT_SITEMAP[key as IKeyInfoSitemap];
        const statusStep =
          key === IKeyInfoSitemap.verifiedSite && typeof dataStep === "string"
            ? !!dataStep.length
            : !!dataStep;
        return (
          <ItemStepSubmitSiteMap
            key={key}
            numberOrder={index + 1}
            des={step.des}
            title={step.title}
            img={step.img}
            titleBtn={step.titleBtn}
            statusStep={statusStep}
            onClickStep={() => {
              handleClickStep(key as IKeyInfoSitemap);
            }}
            isLoading={isLoadingBtnStep({ key: key as IKeyInfoSitemap })}
            isDisabled={isDisabledBtnStep({
              key: key as IKeyInfoSitemap,
              data: infoSitemapState,
            })}
          />
        );
      }) : <></>,
    [infoSitemapState, handleClickStep, isLoadingBtnStep, isDisabledBtnStep]
  );

  const displaySectionSearchConsole = useMemo(
    () => (
      <CollapsibleSubmitSiteMap
        numberTaskComplete={numberTaskComplete}
        isLoadingDisconnect={isLoadingOnDisconnectSearchConsole}
        onConfirmDisconnect={onConfirmDisconnectSearchConsole}
      >
        {displaySteps}
      </CollapsibleSubmitSiteMap>
    ),
    [
      numberTaskComplete,
      isLoadingOnDisconnectSearchConsole,
      onConfirmDisconnectSearchConsole,
      displaySteps,
    ]
  );

  const eleDomMain = useMemo(() => {
    if (isAcceptPlanCurrent) return displaySectionSearchConsole;
    return (
      <SectionUpGradePlan
        onOpenModalCheckPlan={() => {
          openModalCheckPlan(planCurrent);
        }}
      />
    );
  }, [
    displaySectionSearchConsole,
    isAcceptPlanCurrent,
    openModalCheckPlan,
    planCurrent,
  ]);

  const toastMarkup = useMemo(
    () =>
      toastInfo.isOpen && (
        <Toast
          content={toastInfo.message}
          error={toastInfo.isError}
          onDismiss={() => {
            toggleIsOpenToast({ isOpen: false });
            if (searchParams.has("connect")) {
              searchParams.delete("connect");
              setSearchParams(searchParams);
            }
          }}
        />
      ),
    [
      searchParams,
      setSearchParams,
      toastInfo.isError,
      toastInfo.isOpen,
      toastInfo.message,
      toggleIsOpenToast,
    ]
  );

  if (isInitialLoading) {
    return <SkeletonBodyText lines={7} />;
  }

  return (
    <div className="SearchConsoleSiteMapSEO">
      {eleDomMain}

      {toastMarkup}

      {/* modal notification*/}
      <ModalBaseInfo
        isOpenModal={isOpenModal}
        icon={modalSetting?.icon || ""}
        title_header={modalSetting?.title_header}
        des={modalSetting?.des}
        titlePrimaryAction={modalSetting?.titlePrimaryAction}
        onPrimaryAction={modalSetting?.onPrimaryAction}
        title={modalSetting?.title}
        titleSecondaryAction={modalSetting?.titleSecondaryAction}
        onSecondaryAction={
          modalSetting?.onSecondaryAction
            ? modalSetting.onSecondaryAction
            : onCloseModal
        }
        isDestructive={modalSetting?.isDestructive}
        onCloseAction={onCloseModal}
        isLoadingPrimaryAction={isLoadingOnDisconnectSearchConsole}
        errorID={modalSetting?.errorID}
      />
    </div>
  );
}

export default SearchConsoleSiteMapSEO;
