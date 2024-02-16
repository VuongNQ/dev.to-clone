import { Text } from "@shopify/polaris";
// import { storeSpeed, storeSpeedJp } from '@swift/assets';
import iconChecked from "../../assets/icon-checked.svg";
import storeSpeed from "../../assets/store-speed.png";
import { useTranslation } from "react-i18next";

import "./styles.scss";

const StoreSpeed = () => {
  const { t } = useTranslation();

  const LIST_DES = [
    {
      title: t("one_expert_page.store_speed_component.feat_title1"),
      des: t("one_expert_page.store_speed_component.feat_des1"),
    },
    {
      title: t("one_expert_page.store_speed_component.feat_title2"),
      des: t("one_expert_page.store_speed_component.feat_des2"),
    },
    {
      title: t("one_expert_page.store_speed_component.feat_title3"),
      des: t("one_expert_page.store_speed_component.feat_des3"),
    },
    {
      title: t("one_expert_page.store_speed_component.feat_title4"),
      des: t("one_expert_page.store_speed_component.feat_des4"),
    },
  ];

  return (
    <div className="StoreSpeedComponent flex gap-5">
      <div className="StoreSpeedComponent__left">
        <p className="OneExpertPage__topic">
          <Text alignment="start" as="span" variant="headingXs" color="subdued">
            {t("one_expert_page.store_speed_component.topic")}
          </Text>
        </p>

        <Text alignment="start" as="span" variant="headingXl">
          {t("one_expert_page.store_speed_component.title")}
        </Text>
        <Text alignment="start" as="p" variant="bodyMd" color="subdued">
          {t("one_expert_page.store_speed_component.des")}
        </Text>

        <ul className="StoreSpeedComponent__list mt-5">
          {LIST_DES.map((item) => (
            <li key={item.title} className="StoreSpeedComponent__item">
              <div className="StoreSpeedComponent__item-title">
                <img src={iconChecked} alt="" />
                <Text as="span" variant="bodyMd">
                  {item.title}
                </Text>
              </div>
              <Text as="span" variant="bodySm" color="subdued">
                {item.des}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      {/* {i18n.resolvedLanguage === 'jp' ? (
                        <div className="StoreSpeedComponent__right">
                            <img loading="lazy" width="420px" height="350px" src={storeSpeedJp} alt="store speed" />
                        </div>
                    ) : (
                     
                    )} */}
      <div className="StoreSpeedComponent__right">
        <img
          className="object-contain"
          loading="lazy"
          src={storeSpeed}
          width="420px"
          height="350px"
          alt="store speed"
        />
        {/* <div className="StoreSpeedComponent__business-day">
          <img src={iconCalculator} alt="" />
          <p>
            3 - 7 <br /> {t("one_expert_page.proven_component.text_img")}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default StoreSpeed;
