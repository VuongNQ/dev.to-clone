import { Card, EmptyState, Frame, Loading, Page } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import notFoundImage from "@swift/assets/empty-state.svg";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
// import { ErrorResponseImpl } from "@remix-run/router/dist/utils";

export default function NotFound() {
    const { t } = useTranslation();
    const error = useRouteError();

    // console.log("NotFound", error);
    try {
        const parse = JSON.stringify(error);
        if (parse.includes("Failed to fetch dynamically imported module"))
            window.location.reload();
    } catch (error) {
        // console.log("Cannot get error");
    }
    if (isRouteErrorResponse(error)) {
        return (
            <Page>
                <Card>
                    <EmptyState
                        heading={t("common.page_not_found.heading")}
                        image={notFoundImage}
                    >
                        <p>{t("common.page_not_found.description")}</p>
                    </EmptyState>
                </Card>
            </Page>
        );
    } else {
        // window.location.reload();
        return (
            <Frame><Loading /></Frame>
        );
    }
}
