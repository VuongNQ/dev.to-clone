import { Button, Text, TextField } from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";
import { useAppSelector } from "@swift/hooks";
import useScrollView from "@swift/hooks/useScrollView";
import { customerData } from "@swift/store/global";
import { PlanType } from "@swift/types/planPricing";
import {
  EFieldFQASnippet,
  EFieldSnippetFAQ,
  IDataFQASnippet,
} from "@swift/types/snippetSEO";
import { generateRandomInteger } from "@swift/utils/funcNumber";
import { useField } from "formik";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { INIT_FQA, NUMBER_FQA_PLAN } from "../../constants";
import "./styles.scss";

function SettingListFQASnippetSEO() {
  const { t } = useTranslation();

  const refIntoView = useRef<HTMLDivElement>(null);

  const { onScrollView } = useScrollView({ ref: refIntoView });

  const customer = useAppSelector(customerData);

  const limitNumberFQA = useMemo(
    () => NUMBER_FQA_PLAN[customer?.app_plan || PlanType.free],
    [customer?.app_plan]
  );

  const [{ value: fieldFAQS }, metaFAQS, helpersFAQS] = useField<
    IDataFQASnippet[] | null
  >(`${EFieldSnippetFAQ.faqs}`);

  const dataFAQS: IDataFQASnippet[] = useMemo(() => {
    if (!fieldFAQS || !fieldFAQS.length) return [];
    return fieldFAQS.map(({ id, answer, question }, index) => {
      return {
        answer,
        question,
        id: id ?? generateRandomInteger(index + 1),
      };
    });
  }, [fieldFAQS]);

  const isAllowAdd = useMemo(
    () => dataFAQS.length < limitNumberFQA,
    [dataFAQS.length, limitNumberFQA]
  );

  const onAddFQA = useCallback(() => {
    const id = generateRandomInteger(1000);

    helpersFAQS.setValue([...dataFAQS, { ...INIT_FQA, id: id }]);
    setTimeout(() => {
      onScrollView("end");
    }, 700);
  }, [dataFAQS, helpersFAQS, onScrollView]);

  const onDeleteFQA = useCallback(
    (id: number) => {
      // console.log("dataFAQS", dataFAQS);
      const newListQaq = [...dataFAQS].filter((item) => item.id !== id);
      // console.log("newListQaq", newListQaq);
      helpersFAQS.setValue(newListQaq);
    },
    [dataFAQS, helpersFAQS]
  );

  const onUpdateValueField = useCallback(
    ({
      id,
      value,
      key,
    }: {
      id: number;
      value: string;
      key: EFieldFQASnippet.answer | EFieldFQASnippet.question;
    }) => {
      const data = [...dataFAQS];
      const item = data.findIndex((i) => i[EFieldFQASnippet.id] === id);
      if (item === -1) return;
      data[item][key] = value;
      helpersFAQS.setValue(data);
    },
    [dataFAQS, helpersFAQS]
  );

  return (
    <div className="SettingListFQASnippetSEO flex flex-col gap-5 p-5" ref={refIntoView}>
      {dataFAQS.map((item, index) => (
        <div
          key={`${item.id}${index}`}
          className="SettingListFQASnippetSEO__item-fqa flex flex-col gap-3"
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <Text as="h4" variant="headingSm">
                {t("smartSEO.snippet.faq.question", {
                  number: index + 1,
                })}
              </Text>
            </div>
            <Button
              onClick={() => {
                onDeleteFQA(item.id);
              }}
              plain
              icon={DeleteMajor}
            ></Button>
          </div>
          <div className="p-2 flex flex-col gap-3">
            <TextField
              label={t("smartSEO.snippet.faq.label_question")}
              placeholder={t("smartSEO.snippet.faq.placeholder_question")}
              value={item[EFieldFQASnippet.question]}
              onChange={(value) => {
                onUpdateValueField({
                  id: item.id,
                  key: EFieldFQASnippet.question,
                  value,
                });
              }}
              error={
                metaFAQS.error && metaFAQS.error[index]
                  ? t(
                      (metaFAQS.error[index] as unknown as IDataFQASnippet)[
                        EFieldFQASnippet.question
                      ]
                    )
                  : ""
              }
              autoComplete="off"
            />
            <TextField
              label={t("smartSEO.snippet.faq.label_answer")}
              placeholder={t("smartSEO.snippet.faq.placeholder_answer")}
              value={item[EFieldFQASnippet.answer]}
              onChange={(value) => {
                onUpdateValueField({
                  id: item.id,
                  key: EFieldFQASnippet.answer,
                  value,
                });
              }}
              error={
                metaFAQS.error && metaFAQS.error[index]
                  ? t(
                      (metaFAQS.error[index] as unknown as IDataFQASnippet)[
                        EFieldFQASnippet.answer
                      ]
                    )
                  : ""
              }
              autoComplete="off"
            />
          </div>
        </div>
      ))}

      <div>
        <Button disabled={!isAllowAdd} onClick={onAddFQA}>
          {t("smartSEO.snippet.faq.btn_add")}
        </Button>
      </div>
    </div>
  );
}

export default SettingListFQASnippetSEO;
