import { Button, ChoiceList, Divider, Icon, Modal, Text, Tooltip } from "@shopify/polaris";
import { QuestionMarkMinor } from "@shopify/polaris-icons";
import walletOneExpert from "@swift/assets/svg/oneExpert/wallet-oneExpert.svg";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { MAXIMUM_TOTAL_SHOPIFY } from "@swift/constants/constantsGeneral";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { useOneExpertService } from "@swift/services/oneExpertApi";
import { EFormHireExperts, IFormHireExperts } from "@swift/types/modalHireExperts";
import { validationModalHireExperts } from "@swift/validation/validationModalHireExperts";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import Parse from "html-react-parser";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import InputHireExperts from "./InputHireExperts";
import "./styles.scss";

const dataHireExpert = [
    { id: 1, label: "modal.hire_experts.services.0" },
    { id: 2, label: "modal.hire_experts.services.1" },
    { id: 3, label: "modal.hire_experts.services.2" },
    { id: 4, label: "modal.hire_experts.services.3" },
    { id: 5, label: "modal.hire_experts.services.4" },
    { id: 6, label: "modal.hire_experts.services.5" },
];

const INIT_DATA: IFormHireExperts = {
    number_of_tickets: "1",
    extra_price: "0",
};

const ModalHireExpert = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { t } = useTranslation();

    const { URL_ROOT_APP } = usePlanPricing({});

    const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

    const { chargeTicket } = useOneExpertService();

    const refModal = createRef<HTMLDivElement>();

    const [selected, setSelected] = useState(["hidden"]);

    const [totalPrice, setTotalPrice] = useState(PLAN_PRICING.swift_experts.price);

    const [isErrorMaxTotal, setIsErrorMaxTotal] = useState(false);

    const { mutate: onCharge, isLoading: isLoadingOnCharge } = useMutation({
        mutationFn: async ({
            numberTicket,
            totalPrice,
            extraPrice,
        }: {
            totalPrice: number;
            numberTicket: number;
            extraPrice?: number | undefined;
        }) => {
            const url = `${URL_ROOT_APP}/one-experts?tabs=ticket`;
            return await chargeTicket(url, totalPrice, Number(numberTicket), extraPrice);
        },
        onSuccess: (res) => {
            const { status, data } = res;
            if (status && data) {
                onRedirectRemoteCurrentTabs(data.redirect_url);
            }
        },
    });

    const LIST_POLICY = useMemo(
        () => [
            {
                label: t("modal.hire_experts.policies.0"),
                value: "shipping",
            },
            {
                label: Parse(t("modal.hire_experts.policies.1")),
                value: "confirmation",
            },
        ],
        [t]
    );

    const handleChange = useCallback((value: string[]) => setSelected(value), []);

    const handleUpdateTotal = (data: IFormHireExperts) => {
        const { extra_price, number_of_tickets } = data;
        const numberTicket = Number(number_of_tickets);
        const numberExtraPrice = Number(extra_price);

        if (isNaN(numberTicket) || isNaN(numberExtraPrice) || numberTicket <= 0 || numberExtraPrice < 0) return;
        const total = Number(number_of_tickets) * PLAN_PRICING.swift_experts.price + Number(extra_price);
        setIsErrorMaxTotal(() => (total > MAXIMUM_TOTAL_SHOPIFY ? true : false));
        setTotalPrice(total);
    };

    useEffect(() => {
        if (isOpen && refModal.current) {
            (refModal.current.parentElement?.previousElementSibling as HTMLElement).style.display = "none";
        }
    }, [isOpen]);

    return (
        <Formik
            initialValues={INIT_DATA}
            validationSchema={validationModalHireExperts}
            onSubmit={(value) => {
                const { extra_price, number_of_tickets } = value;
                onCharge({
                    numberTicket: Number(number_of_tickets),
                    totalPrice: totalPrice,
                    extraPrice: Number(extra_price),
                });
            }}
            validate={(values) => {
                handleUpdateTotal(values);
            }}
        >
            {({ submitForm, resetForm, isValid, values }) => (
                <Modal
                    open={isOpen}
                    onClose={() => {
                        onClose();
                        // resetForm();
                    }}
                    title="Welcome to OneExpert"
                    titleHidden
                >
                    <div ref={refModal} className="ModalHireExpert__header flex gap-3">
                        <div className="flex flex-col gap-2 flex-1 p-5">
                            <Text as="h3" variant="headingXl">
                                {t("modal.hire_experts.title_speed")}
                            </Text>
                            <Text as="p" variant="bodyMd" color="subdued">
                                {t("modal.hire_experts.des_speed")}
                            </Text>
                            <div className="">
                                <Text as="span" variant="heading3xl" color="success">
                                    ${PLAN_PRICING.swift_experts.price}
                                </Text>
                                <sub>
                                    <Text as="span" variant="bodyMd" color="subdued">
                                        {t("modal.hire_experts.sub_des")}
                                    </Text>
                                </sub>
                            </div>
                        </div>
                        <div className="flex p-5">
                            <img className="ModalHireExpert__icon-header" src={walletOneExpert} alt="" />
                        </div>
                    </div>
                    <div className="ModalHireExpert__body px-5 pt-5 flex">
                        <div className="ModalHireExpert__services flex flex-col gap-3 p-5">
                            <Text as="span" variant="headingMd" color="success">
                                {t("modal.hire_experts.text_all_services")}
                            </Text>
                            <div className=" flex flex-col gap-3">
                                {dataHireExpert.map((item) => (
                                    <div className="flex items-center gap-2" key={item.id}>
                                        <Text as="span" variant="bodySm" color="success">
                                            ✓
                                        </Text>
                                        <Text as="span" variant="bodyMd">
                                            {t(item.label)}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-5 px-5 py-2 ">
                            <div className="flex flex-col gap-3">
                                <InputHireExperts
                                    fieldName={EFormHireExperts.number_of_tickets}
                                    label={t("modal.hire_experts.form_charge.form_ticket.title")}
                                    isDisabledActionPlus={Number(values[EFormHireExperts.number_of_tickets]) >= 66}
                                    isDisabledActionMinus={Number(values[EFormHireExperts.number_of_tickets]) <= 1}
                                    messageError={
                                        isErrorMaxTotal ? t("modal.hire_experts.error_max_total_shopify") : ""
                                    }
                                />
                                <InputHireExperts
                                    fieldName={EFormHireExperts.extra_price}
                                    label={
                                        <span className="flex gap-2">
                                            {t("modal.hire_experts.form_charge.form_tip.title")}{" "}
                                            <Tooltip
                                                content={Parse(t("modal.hire_experts.form_charge.form_tip.tooltip"))}
                                            >
                                                <Icon source={QuestionMarkMinor} color="base" />
                                            </Tooltip>
                                        </span>
                                    }
                                    isDisabledActionMinus={Number(values[EFormHireExperts.extra_price]) <= 0}
                                />
                            </div>
                            <Divider></Divider>
                            <div className="flex gap-2 items-center">
                                <Text as="span">{t("modal.hire_experts.form_charge.form_bill.txt_tip")}</Text>
                                <div className="flex-1">
                                    <Text as="span" variant="headingSm" alignment="end">
                                        +$
                                        {!values[EFormHireExperts.extra_price].length ||
                                        Number(values[EFormHireExperts.extra_price]) < 0 ||
                                        isNaN(Number(values[EFormHireExperts.extra_price]))
                                            ? 0
                                            : values[EFormHireExperts.extra_price]}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Text as="span" variant="headingSm">
                                    {t("modal.hire_experts.form_charge.form_bill.txt_total")}
                                </Text>
                                <div className="flex-1">
                                    <Text as="span" variant="headingXl" alignment="end" color="success">
                                        +${totalPrice}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 pt-3">
                        <ChoiceList
                            allowMultiple
                            title=""
                            choices={LIST_POLICY}
                            selected={selected}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 p-5 justify-center">
                        <Button
                            onClick={() => {
                                onClose();
                                resetForm();
                            }}
                        >
                            {t("common.btn_cancel")}
                        </Button>
                        <Button
                            primary
                            loading={isLoadingOnCharge}
                            disabled={selected.length < 3 || !isValid || isErrorMaxTotal}
                            onClick={submitForm}
                        >
                            {t("common.btn_check_out")}
                        </Button>
                    </div>
                </Modal>
            )}
        </Formik>
    );
};

export default ModalHireExpert;
