import { queryKeys } from "@swift/queryKeys";
import { IDataSnippetSetting } from "@swift/types/snippetSEO";
import { useQuery } from "@tanstack/react-query";

function useFuncSnippets() {
    const { data: dataResSnippet, refetch: refetchDataResSnippet } =
        useQuery<IDataSnippetSetting>(
            queryKeys.advancedSeo.getSnippetSetting().queryKey
        );

    return {
        dataResSnippet,
        refetchDataResSnippet,
    };
}

export default useFuncSnippets;
