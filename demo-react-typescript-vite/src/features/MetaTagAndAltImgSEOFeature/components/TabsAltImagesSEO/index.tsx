import { ContextualSaveBar, Divider, Text, Toast } from "@shopify/polaris";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import altImg from "@swift/assets/images/basicSeo/alt-img.png";
import "./styles.scss";

import FrequentlyAskedQuestions from "@swift/components/UIs/FrequentlyAskedQuestions";
import {
  DEFAULT_ALT_IMAGE,
  LIST_QUESTION_ALT_IMG,
} from "@swift/constants/constantsSeoBasic";
import { SettingAltImgMetaTagContext } from "@swift/contexts/SettingAltImgMetaTagContext";
import { useToastGeneral } from "@swift/hooks/useToastGeneral";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import {
  EStatusHandledTotal,
  IDataBulkAltImgMetaTag,
  KeyStatusBulkAddAltImgAndMetaTag,
  ProductTag
} from "@swift/types/boostSEO";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useScanBulkAltImgAndMetaTag } from "../../hooks/useScanBulkAltImgAndMetaTag";
import AutoAltImagesSEO from "../AutoAltImagesSEO";
import BulkMetaTagsAndAltImg from "../BulkMetaTagsAndAltImg";
import InputProductTag from "../InputProductTag";

const LIST_PRODUCT_TAG = [
  ProductTag.PRODUCT_TITLE_FORMAT,
  ProductTag.PRODUCT_TYPE_FORMAT,
  ProductTag.PRODUCT_CATEGORY_FORMAT,
  ProductTag.SHOP_NAME_FORMAT,
];

function TabsAltImagesSEO() {
  const { t } = useTranslation();

  const { postBulkAddAltImg, postScanMissingAltImage } = useBoostSEOService();

  const { handleUpdateSettingBulk } = useScanBulkAltImgAndMetaTag();

  const {
    dataAltImgMetaTagState,
    handleSetDataAltImgMetaTagState,
    isChangeData,
    onSaveAltImgMetaTag,
    isLoadingSaveAltImgMetaTag,
    handleRevertDataOrigin,
  } = useContext(SettingAltImgMetaTagContext);

  const { toastInfo, toggleIsOpenToast } = useToastGeneral();

  const [formState, setFormState] = useState({
    product_alt_image_format: {
      isValid: true,
      message: "",
    },
  });

  const { data: dataBulkAltMetaTag, isLoading: isLoadingFetchData } =
    useQuery<IDataBulkAltImgMetaTag>(
      queryKeys.basicSeo.getBulkAddAltImgAndMetaTag().queryKey
    );

  const dataBulkAddAltImg = useMemo(() => {
    if (!dataBulkAltMetaTag) return null;
    const { dataBulkAddAltImg } = dataBulkAltMetaTag;
    return dataBulkAddAltImg;
  }, [dataBulkAltMetaTag]);

  const dataScanMissingAltImg = useMemo(() => {
    if (!dataBulkAltMetaTag) return null;
    const { dataScanMissingAltImg } = dataBulkAltMetaTag;
    return dataScanMissingAltImg;
  }, [dataBulkAltMetaTag]);

  const { mutate: onPostBulkAddAltImg, isLoading: isLoadingPostBulkAddAltImg } =
    useMutation({
      mutationFn: async () => {
        const { status } = await postBulkAddAltImg();

        if (status) {
          handleUpdateSettingBulk({
            key: "dataBulkAddAltImg",
            payload: {
              status: KeyStatusBulkAddAltImgAndMetaTag.processing,
            },
          });
          return;
        }
      },
    });

  const {
    mutate: onPostScanMissingAltImg,
    isLoading: isLoadingPostScanMissingAltImg,
  } = useMutation({
    mutationFn: async () => {
      const { status } = await postScanMissingAltImage();

      if (status) {
        handleUpdateSettingBulk({
          key: "dataScanMissingAltImg",
          payload: {
            status: KeyStatusBulkAddAltImgAndMetaTag.processing,
          },
        });
        return;
      }
    },
  });

  const handleValidateAltImg = useCallback(() => {
    const formStateTemp = {
      product_alt_image_format: { isValid: true, message: "" },
    };

    for (const property in formState) {
      const value =
        dataAltImgMetaTagState[property as keyof typeof dataAltImgMetaTagState];
      // const value = formState[property as keyof typeof formState]
      if (typeof value !== "boolean" && value.length <= 0) {
        formStateTemp[property as keyof typeof formState].isValid = false;
        formStateTemp[property as keyof typeof formState].message = t(
          "boostSEO.validate_alt_img_meta_tag"
        );
      }
    }

    setFormState(formStateTemp);
  }, [dataAltImgMetaTagState.product_alt_image_format, t]);

  useEffect(() => {
    handleValidateAltImg();
  }, [dataAltImgMetaTagState.product_alt_image_format]);

  /** check enable button save */
  const isSubmitSave = useMemo(() => {
    for (const property in formState) {
      const isValid = formState[property as keyof typeof formState].isValid;

      if (!isValid) {
        return false;
      }
    }

    return true;
  }, [formState]);
  /** end check enable button save */

  const toastMarkup = useMemo(
    () =>
      toastInfo.isOpen ? (
        <Toast
          content={toastInfo.message}
          error={toastInfo.isError}
          onDismiss={() => {
            toggleIsOpenToast({ isOpen: false });
          }}
        />
      ) : null,
    [toastInfo.isError, toastInfo.isOpen, toastInfo.message, toggleIsOpenToast]
  );

  const isLoadingBtn = useMemo(
    () =>
      isLoadingFetchData ||
      isLoadingPostBulkAddAltImg ||
      isLoadingPostScanMissingAltImg ||
      dataBulkAddAltImg?.status ===
        KeyStatusBulkAddAltImgAndMetaTag.processing ||
      dataScanMissingAltImg?.status ===
        KeyStatusBulkAddAltImgAndMetaTag.processing,
    [
      dataBulkAddAltImg?.status,
      dataScanMissingAltImg?.status,
      isLoadingFetchData,
      isLoadingPostBulkAddAltImg,
      isLoadingPostScanMissingAltImg,
    ]
  );

  const isScanMissingFirstTime = useMemo(() => {
    if (!dataScanMissingAltImg) return true;
    if (dataScanMissingAltImg.handled_total === EStatusHandledTotal.not_handled)
      return true;

    return false;
  }, [dataScanMissingAltImg]);

  const isAddBulk = useMemo(() => {
    if (
      dataScanMissingAltImg &&
      dataScanMissingAltImg.status === KeyStatusBulkAddAltImgAndMetaTag.done &&
      dataScanMissingAltImg.handled_total > 0
    )
      return true;

    return false;
  }, [dataScanMissingAltImg]);

  const isScanMissingAgain = useMemo(() => {
    if(dataScanMissingAltImg?.handled_total === 0) return true

    if (
      dataScanMissingAltImg?.handled_total ===
        EStatusHandledTotal.not_handled &&
      dataBulkAddAltImg &&
      dataBulkAddAltImg.status === KeyStatusBulkAddAltImgAndMetaTag.done
    )
      return true;

    return false;
  }, [dataBulkAddAltImg, dataScanMissingAltImg?.handled_total]);

  const subTitleBulk = useMemo(() => {
    if (isAddBulk || dataScanMissingAltImg?.handled_total === 0) return t("smartSEO.alt_images.sub_title_scan_missing");

    if (isScanMissingAgain) return t("smartSEO.alt_images.add_bulk.sub_title");

    return t("smartSEO.alt_images.add_bulk_no_image.sub_title");
  }, [dataScanMissingAltImg?.handled_total, isAddBulk, isScanMissingAgain, t]);

  const subDesBulk = useMemo(() => {
    const handledTotal = isAddBulk
      ? dataScanMissingAltImg?.handled_total
      : isScanMissingAgain
      ? dataBulkAddAltImg?.handled_total
      : 0;

    if (handledTotal && handledTotal > 0)
      return t("smartSEO.alt_images.add_bulk.sub_des", {
        number: handledTotal,
      });

    return t("smartSEO.alt_images.add_bulk_no_image.sub_des");
  }, [dataBulkAddAltImg?.handled_total, dataScanMissingAltImg?.handled_total, isAddBulk, isScanMissingAgain, t]);

  const titleBtn = useMemo(() => {
    if (isAddBulk) return t("smartSEO.alt_images.add_bulk.btn_add");

    if (isScanMissingAgain) return t("boostSEO.common.btn_re_scan");

    return t("smartSEO.alt_images.add_bulk.btn_scan_missing");
  }, [isAddBulk, isScanMissingAgain, t]);

  const txtDateUpdate = useMemo(() => {
    if (isScanMissingAgain)
      return t("common.txt_last_update", {
        number: formatMDYAMPMAtString(dataBulkAddAltImg?.updated_at || ""),
      });

    return t("common.txt_last_update", {
      number: formatMDYAMPMAtString(dataScanMissingAltImg?.updated_at || ""),
    });
  }, [
    dataBulkAddAltImg?.updated_at,
    dataScanMissingAltImg?.updated_at,
    isScanMissingAgain,
    t,
  ]);

  return (
    <div className="TabsAltImagesSEO p-5 flex flex-col gap-5">
      <div className="TabsAltImagesSEO__banner flex flex-col gap-3 items-center">
        <img
          loading="lazy"
          src={altImg}
          alt=""
          className="TabsAltImagesSEO__img-example"
        />

        <p className="TabsAltImagesSEO__des-example">
          {t("smartSEO.alt_images.section_example.des")}
        </p>
      </div>

      <div className="TabsAltImagesSEO__form p-5 flex flex-col gap-3 sw__wp-box">
        <Text as="h3" variant="headingMd">
          {t("smartSEO.alt_images.section_form.title")}
        </Text>
        <Divider></Divider>
        <div className="TabsAltImagesSEO__input">
          <InputProductTag
            label={t("smartSEO.alt_images.section_form.lable_input")}
            listProductTag={LIST_PRODUCT_TAG}
            value={dataAltImgMetaTagState.product_alt_image_format}
            setValue={(value) => {
              handleSetDataAltImgMetaTagState({
                product_alt_image_format: value,
              });
            }}
            resetDefaultValue={DEFAULT_ALT_IMAGE}
            isAltImage={true}
            messageError={formState.product_alt_image_format.message}
          />
        </div>
      </div>

      {/* Auto alt img */}
      <AutoAltImagesSEO />
      {/* Auto alt img */}

      <div className="TabsAltImagesSEO__bulk">
        <BulkMetaTagsAndAltImg
          title={t("smartSEO.alt_images.add_bulk.title")}
          des={t("smartSEO.alt_images.add_bulk.des")}
          isShowColRight={isAddBulk || isScanMissingAgain}
          subTitle={subTitleBulk}
          subDes={subDesBulk}
          titleBtn={titleBtn}
          onCallbackBulk={onPostBulkAddAltImg}
          onCallbackScanMissing={onPostScanMissingAltImg}
          txtDateUpdate={txtDateUpdate}
          isLoading={isLoadingBtn}
          isUseScanMissing={isScanMissingFirstTime || isScanMissingAgain}
          isPrimaryBtn={!isScanMissingAgain}
        />
      </div>

      <FrequentlyAskedQuestions
        listQuestion={LIST_QUESTION_ALT_IMG}
        title={t("boostSEO.title_question")}
      />

      {isChangeData && (
        <ContextualSaveBar
          message={t("setting_page.language.save_bar.title")}
          saveAction={{
            content: t("common.btn_save"),
            onAction: onSaveAltImgMetaTag,
            loading: isLoadingSaveAltImgMetaTag,
            disabled: !isSubmitSave,
          }}
          discardAction={{
            content: t("common.btn_discard"),
            onAction: () => {
              handleRevertDataOrigin();
            },
            disabled: isLoadingSaveAltImgMetaTag,
          }}
        />
      )}
      {toastMarkup}
    </div>
  );
}

export default TabsAltImagesSEO;
