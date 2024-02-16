import { Text, TextField } from "@shopify/polaris";
import {
    EFieldSnippetSetting,
    EFieldSocialLinksSnippetSetting,
} from "@swift/types/snippetSEO";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import "./styles.scss";

function SettingSocialProfileSnippetSEO() {
    const { t } = useTranslation();

    const [fieldFacebook, metaFacebook, helpersFacebook] = useField<
        string | null
    >(
        `${EFieldSnippetSetting.social_links}.${EFieldSocialLinksSnippetSetting.facebook}`
    );
    const [fieldInstagram, metaInstagram, helpersInstagram] = useField<
        string | null
    >(
        `${EFieldSnippetSetting.social_links}.${EFieldSocialLinksSnippetSetting.instagram}`
    );
    const [fieldLinkedin, metaLinkedin, helpersLinkedin] = useField<
        string | null
    >(
        `${EFieldSnippetSetting.social_links}.${EFieldSocialLinksSnippetSetting.linkedin}`
    );
    const [fieldSnapchat, metaSnapchat, helpersSnapchat] = useField<
        string | null
    >(
        `${EFieldSnippetSetting.social_links}.${EFieldSocialLinksSnippetSetting.snapchat}`
    );
    const [fieldTwitter, metaTwitter, helpersTwitter] = useField<string | null>(
        `${EFieldSnippetSetting.social_links}.${EFieldSocialLinksSnippetSetting.twitter}`
    );
    const [fieldYoutube, metaYoutube, helpersYoutube] = useField<string | null>(
        `${EFieldSnippetSetting.social_links}.${EFieldSocialLinksSnippetSetting.youtube}`
    );

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col flex-1 gap-3">
                <Text as="h4" variant="headingSm">
                    {t("smartSEO.snippet.store_profile.social.title")}
                </Text>
                <Text as="h4" variant="bodyMd" color="subdued">
                    {t("smartSEO.snippet.store_profile.social.des")}
                </Text>
            </div>
            <div className="SettingSocialProfileSnippetSEO__box flex flex-1 gap-5">
                <div className="SettingStoreProfileSnippetSEO__col-2">
                    <TextField
                        label="Facebook URL"
                        placeholder="http://facebook.com/your profile/"
                        value={fieldFacebook.value || ""}
                        onChange={(value) => {
                            helpersFacebook.setValue(value);
                        }}
                        autoComplete="off"
                        error={metaFacebook.error ? t(metaFacebook.error) : ""}
                    />
                </div>
                <div className="SettingStoreProfileSnippetSEO__col-2">
                    <TextField
                        label="Instagram URL"
                        placeholder="http://instagram.com/profile/"
                        value={fieldInstagram.value || ""}
                        onChange={(value) => {
                            helpersInstagram.setValue(value);
                        }}
                        autoComplete="off"
                        error={
                            metaInstagram.error ? t(metaInstagram.error) : ""
                        }
                    />
                </div>
            </div>
            <div className="SettingSocialProfileSnippetSEO__box flex flex-1 gap-5">
                <div className="SettingStoreProfileSnippetSEO__col-2">
                    <TextField
                        label="Snapchat URL"
                        placeholder="http://snapchat.com/profile/"
                        value={fieldSnapchat.value || ""}
                        onChange={(value) => {
                            helpersSnapchat.setValue(value);
                        }}
                        autoComplete="off"
                        error={metaSnapchat.error ? t(metaSnapchat.error) : ""}
                    />
                </div>
                <div className="SettingStoreProfileSnippetSEO__col-2">
                    <TextField
                        label="YouTube URL"
                        placeholder="http://youtube.com/profile/"
                        value={fieldYoutube.value || ""}
                        onChange={(value) => {
                            helpersYoutube.setValue(value);
                        }}
                        autoComplete="off"
                        error={metaYoutube.error ? t(metaYoutube.error) : ""}
                    />
                </div>
            </div>
            <div className="SettingSocialProfileSnippetSEO__box flex flex-1 gap-5">
                <div className="SettingStoreProfileSnippetSEO__col-2">
                    <TextField
                        label="LinkedIn URL"
                        placeholder="http://linkedin.com/profile/"
                        value={fieldLinkedin.value || ""}
                        onChange={(value) => {
                            helpersLinkedin.setValue(value);
                        }}
                        autoComplete="off"
                        error={metaLinkedin.error ? t(metaLinkedin.error) : ""}
                    />
                </div>
                <div className="SettingStoreProfileSnippetSEO__col-2">
                    <TextField
                        label="Twitter URL"
                        placeholder="http://twitter.com/profile/"
                        value={fieldTwitter.value || ""}
                        onChange={(value) => {
                            helpersTwitter.setValue(value);
                        }}
                        autoComplete="off"
                        error={metaTwitter.error ? t(metaTwitter.error) : ""}
                    />
                </div>
            </div>
        </div>
    );
}

export default SettingSocialProfileSnippetSEO;
