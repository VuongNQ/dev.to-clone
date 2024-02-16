import {
    createQueryKeys,
    inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { SNIPPET_SETTING_DEFAULT } from "@swift/constants/constantsSeoAdvanced";

export const advancedSeoQueryKey = createQueryKeys("advancedSeo", {
    //sitemap
    getDetailSitemap: () => ({
        queryKey: ["getDetailSitemap"],
        queryFn: null,
    }),
    // snippet
    getSnippetSetting: () => ({
        queryKey: ["getSnippetSetting"],
        initialData: SNIPPET_SETTING_DEFAULT
    }),
    // snippet
    getSettingMonitor404: () => ({
        queryKey: ["getSettingMonitor404"],
        queryFn: null,
    }),
});

export type TAdvancedSeoQueryKey = inferQueryKeys<typeof advancedSeoQueryKey>;
