import { TextField } from "@shopify/polaris";
import ValidateWarning from "@swift/components/UIs/ValidateWarning";
import { MESSAGE_WARNING_AUDIT_DETAIL } from "@swift/constants/constantsSeoBasic";
import {
	IFieldValidate,
	IWarningEditAudit,
	generateContentAI,
} from "@swift/types/boostSEO";
import { IMaxStringProductAudit } from "@swift/validation/validationAuditProduct";
import { Editor } from "@tinymce/tinymce-react";
import { Field, FieldProps, useField } from "formik";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Editor as TinyMCEEditor } from "tinymce";
import InputEditAuditProduct from "../InputEditAuditProduct";
import "./styles.scss";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";

function ProductContentEditAuditProduct() {
	const { t } = useTranslation();

	const { dataDetailAuditProduct, handleUpdateDataAuditProduct } = useContext(
		EditAuditProductContext
	);

	const editorRef = useRef<TinyMCEEditor | null>(null);

	const [, , helpers] = useField(IFieldValidate.description_html);

	const [warningTitle, setWarningTitle] = useState<IWarningEditAudit>({
		isFirstChange: false,
		isOpen: false,
	});

	const [warningDescriptionHtml, setWarningDescriptionHtml] =
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
		[warningTitle, warningDescriptionHtml]
	);

	useEffect(() => {
		if (!editorRef.current || !dataDetailAuditProduct?.description_html?.length)
			return;
		helpers.setValue(editorRef.current.getContent());
	}, [dataDetailAuditProduct?.description_html]);

	return (
		<div className="ProductContentEditAuditProduct flex flex-col gap-5 px-5 p-5">
			<Field name={IFieldValidate.title}>
				{({ field, meta, form }: FieldProps) => (
					<InputEditAuditProduct
						label={t(
							"smartSEO.audit_product.edit_audit_product.input_title.label"
						)}
						tooltipGenerateAI={t(
							"smartSEO.audit_product.edit_audit_product.input_title.tooltip"
						)}
						typeGenerate={generateContentAI.title}
						isUseOnReplace={true}
						onClickReplace={(value) => {
							form.setFieldValue(IFieldValidate.title, value);
						}}
						value={field.value}
					>
						<TextField
							label=""
							multiline
							value={field.value}
							onChange={(value) => {
								form.setFieldValue(IFieldValidate.title, value);
								handleOpenWarning({
									callback: setWarningTitle,
									isOpen: true,
									defaultValue: warningTitle,
								});
							}}
							autoComplete="off"
							error={
								meta.error
									? t(meta.error, {
										maxAdvise: IMaxStringProductAudit.title_tag_advise,
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

						{/* <textarea
              ref={refInput}
              className={`global__input py-2 px-3 resize-input ${
                meta.touched && meta.error && "global__input--error"
              }`}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleOpenWarning({
                  callback: setWarningTitle,
                  isOpen: true,
                  defaultValue: warningTitle,
                });
              }}
            /> */}
						{field.value.length >= IMaxStringProductAudit.title_tag_warning && (
							<ValidateWarning
								isOpen={warningTitle.isOpen}
								message={t(MESSAGE_WARNING_AUDIT_DETAIL.title)}
								onClose={() => {
									handleOpenWarning({
										callback: setWarningTitle,
										isOpen: false,
										defaultValue: warningTitle,
									});
								}}
							/>
						)}
					</InputEditAuditProduct>
				)}
			</Field>

			<InputEditAuditProduct
				label={t(
					"smartSEO.audit_product.edit_audit_product.input_description.label"
				)}
				tooltipGenerateAI={t(
					"smartSEO.audit_product.edit_audit_product.input_description.tooltip"
				)}
				typeGenerate={generateContentAI.description}
				value=""
			>
				<Field
					id={IFieldValidate.description_html}
					name={IFieldValidate.description_html}
				>
					{({ field, form }: FieldProps) => (
						<Editor
							apiKey="ws9zatub0ln6agiv8mdoycqdu0a2vfg1d85qc0ox8aodkmmt"
							value={field.value}
							// initialValue={field.value}
							// {...field}
							onEditorChange={(value) => {
								// setTextEditor(value);
								// console.log("onEditorChange");
								form.setFieldValue(IFieldValidate.description_html, value);
								handleOpenWarning({
									callback: setWarningDescriptionHtml,
									isOpen: true,
									defaultValue: warningDescriptionHtml,
								});
							}}
							/*
										  onChange={(event, editor) => {
											  console.log('onChange', editor.getContent())
											  // form.setFieldValue(IFieldValidate.description_html, editor.getContent());
										  }}
										  */
							onInit={(_, editor) => {
								// console.log('onInit');
								editorRef.current = editor;
								// setTextEditor(field.value);
							}}
							onLoadContent={(_, editor) => {
								// console.log("onLoadContent >>>", editor.getContent());
								handleUpdateDataAuditProduct({
									description_html: editor.getContent(),
								});
							}}
							init={{
								height: 400,
								menubar: false,
								plugins: [
									"advlist",
									"autolink",
									"lists",
									"link",
									// "image",
									"charmap",
									"preview",
									"anchor",
									"searchreplace",
									"visualblocks",
									"code",
									"fullscreen",
									"insertdatetime",
									"media",
									"table",
									"help",
									"wordcount",
									"fullscreen",
								],
								toolbar:
									"undo redo | blocks | fullscreen | " +
									"bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | " +
									"bullist numlist",
								// 'removeformat | help',
								content_style:
									"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
								// emoticons_append: {
								//   custom_mind_explode: {
								//     keywords: ["brain", "mind", "explode", "blown"],
								//     char: "🤯",
								//   },
								// },
							}}
						/>
					)}
				</Field>
			</InputEditAuditProduct>
		</div>
	);
}

export default ProductContentEditAuditProduct;
