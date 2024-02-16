import { Icon, Popover, SkeletonBodyText } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import { KeyOptimzie } from "@swift/types/optimizeTheme";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { LIST_TASK_OPTIMIZE } from "../../constant";
import "./styles.scss";

function DetailFilesOptimized({ title, themeId }: IPropsDetailFilesOptimized) {
  const { getHistoryOptimizeDetail } = useOptimizeThemeService();

  const [isActiveNotify, setIsActiveNotify] = useState(false);

  const { data: dataDetail, isLoading } = useQuery({
    enabled: isActiveNotify,
    ...queryKeys.optimizeTheme.getHistoryOptimizeDetail(themeId),
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data, status } = await getHistoryOptimizeDetail(themeId);

      if (status && data) {
        return data.stats;
      }
      return null;
    },
  });

  const onToggleNotify = useCallback(() => {
    setIsActiveNotify((value) => !value);
  }, []);

  const eleNotify = useMemo(() => {
    if (!dataDetail) return <></>;

    let strElements = "";
    for (const property in dataDetail) {
      if (property === KeyOptimzie.duplicate) continue;
      const value = dataDetail[property as KeyOptimzie]?.total_file;
      if (typeof value === "undefined") continue;

      const findStep = LIST_TASK_OPTIMIZE.find((item) => item.key === property);
      strElements += `${findStep?.title}: ${value} \n`;
    }
    return strElements;
  }, [dataDetail]);

  const activator = (
    <h4 className="cursor-pointer inline-flex gap-3" onClick={onToggleNotify}>
      <span className="DetalFilesOptimized__title"> {title}</span>
      <Icon source={ChevronDownMinor} color="base" />
    </h4>
  );

  return (
    <div className="DetalFilesOptimized">
      <Popover
        active={isActiveNotify}
        activator={activator}
        autofocusTarget="first-node"
        onClose={() => {
          setIsActiveNotify(false);
        }}
      >
        <div className="DetalFilesOptimized__box py-1 px-2">
          {isLoading ? <SkeletonBodyText lines={6} /> : eleNotify}
        </div>
      </Popover>
    </div>
  );
}

interface IPropsDetailFilesOptimized {
  themeId: number;
  title: string;
}
export default DetailFilesOptimized;
