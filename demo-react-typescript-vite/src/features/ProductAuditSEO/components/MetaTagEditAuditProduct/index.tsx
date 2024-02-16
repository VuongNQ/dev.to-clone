import { TextField } from "@shopify/polaris";
import ValidateWarning from "@swift/components/UIs/ValidateWarning";
import { MESSAGE_WARNING_AUDIT_DETAIL } from "@swift/constants/constantsSeoBasic";
import {
	IFieldValidate,
	IWarningEditAudit,
	generateContentAI,
} from "@swift/types/boostSEO";
import { IMaxStringProductAudit } from "@swift/validation/validationAuditProduct";
import { Field, FieldProps } from "formik";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import InputEditAuditProduct from "../InputEditAuditProduct";
import "./styles.scss";

function MetaTagEditAuditProduct() {
	const { t } = useTranslation();

	const [warningTitleTag, setWarningTitleTag] = useState<IWarningEditAudit>({
		isFirstChange: false,
		isOpen: false,
	});

	const [warningDescriptionTag, setWarningDescriptionTag] =
		useState<IWarningEditAudit>({
			isFirstChange: false,
			isOpen: false,
		});

	const handleOpenWarning = useCallback(
		({
			callback,
			isOpen,
			defaultValue,
		}: {
			isOpen: boolean;
			callback: (value: IWarningEditAudit) => void;
			defaultValue: IWarningEditAudit;
		}) => {
			if (!isOpen) {
				callback({
					...defaultValue,
					isOpen: false,
				});
			}

			if (defaultValue.isFirstChange) return;

			callback({
				isFirstChange: true,
				isOpen: true,
			});
		},
		[warningDescriptionTag, warningTitleTag]
	);

	return (
		<div className="flex flex-col gap-5 p-5">
			<Field type="text" name={IFieldValidate.title_tag}>
				{({ field, meta, form }: FieldProps) => (
					<InputEditAuditProduct
						label={t(
							"smartSEO.audit_product.edit_audit_product.input_meta_title.label"
						)}
						tooltipGenerateAI={t(
							"smartSEO.audit_product.edit_audit_product.input_meta_title.tooltip"
						)}
						typeGenerate={generateContentAI.meta_title}
						isUseOnReplace={true}
						onClickReplace={(value) => {
							form.setFieldValue(IFieldValidate.title_tag, value);
						}}
						value={field.value}
					>
						<TextField
							label=""
							multiline
							value={field.value}
							onChange={(value) => {
								form.setFieldValue(IFieldValidate.title_tag, value);
								handleOpenWarning({
									callback: setWarningTitleTag,
									isOpen: true,
									defaultValue: warningTitleTag,
								});
							}}
							autoComplete="off"
							error={
								meta.error
									? t(meta.error, {
										maxAdvise: IMaxStringProductAudit.meta_title_advise,
									})
									: ""
							}
							helpText={`${field.value.length} ${t(
								"smartSEO.audit_product.hint_characters_used",
								{
									number: IMaxStringProductAudit.meta_title_advise,
								}
							)}`}
						/>
						{field.value.length >= IMaxStringProductAudit.meta_title_advise && (
							<ValidateWarning
								isOpen={warningTitleTag.isOpen}
								message={t(MESSAGE_WARNING_AUDIT_DETAIL.title_tag)}
								onClose={() => {
									handleOpenWarning({
										callback: setWarningTitleTag,
										isOpen: false,
										defaultValue: warningTitleTag,
									});
								}}
							/>
						)}
					</InputEditAuditProduct>
				)}
			</Field>

			<Field name={IFieldValidate.description_tag}>
				{({ field, meta, form }: FieldProps) => (
					<InputEditAuditProduct
						label={t(
							"smartSEO.audit_product.edit_audit_product.input_meta_description.label"
						)}
						tooltipGenerateAI={t(
							"smartSEO.audit_product.edit_audit_product.input_meta_description.tooltip"
						)}
						typeGenerate={generateContentAI.meta_description}
						isUseOnReplace={true}
						onClickReplace={(value) => {
							form.setFieldValue(IFieldValidate.description_tag, value);
						}}
						value={field.value}
					>
						<TextField
							label=""
							multiline
							value={field.value}
							onChange={(value) => {
								form.setFieldValue(IFieldValidate.description_tag, value);
								handleOpenWarning({
									callback: setWarningDescriptionTag,
									isOpen: true,
									defaultValue: warningDescriptionTag,
								});
							}}
							autoComplete="off"
							error={
								meta.error
									? t(meta.error, {
										maxAdvise: IMaxStringProductAudit.meta_description_advise,
									})
									: ""
							}
							helpText={`${field.value.length} ${t(
								"smartSEO.audit_product.hint_characters_used",
								{
									number: IMaxStringProductAudit.meta_description_advise,
								}
							)}`}
						/>

						{field.value.length >=
							IMaxStringProductAudit.meta_description_advise && (
								<ValidateWarning
									isOpen={warningDescriptionTag.isOpen}
									message={t(MESSAGE_WARNING_AUDIT_DETAIL.description_tag)}
									onClose={() => {
										handleOpenWarning({
											callback: setWarningDescriptionTag,
											isOpen: false,
											defaultValue: warningDescriptionTag,
										});
									}}
								/>
							)}
					</InputEditAuditProduct>
				)}
			</Field>
		</div>
	);
}

export default MetaTagEditAuditProduct;
