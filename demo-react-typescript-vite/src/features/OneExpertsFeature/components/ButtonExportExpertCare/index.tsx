import { Button } from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
// /**redux */
import { useTranslation } from "react-i18next";
import { usePortalService } from "@swift/services/portalApi";

import { formatDateNameMonthYYYY } from "@swift/utils/formatDate";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { PortalContext } from "../../contexts/PortalContext";

function ButtonExportExpertCare({ id, onNotExport }: IButtonExportExpertCare) {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const { infoPortal, setInfoPortal } = useContext(PortalContext);

  const { getReportCheckup } = usePortalService();

  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const onExportCheckup = useCallback(
    async (id: number) => {
      if (!infoPortal) return;

      setIsLoadingDownload(true);

      const { code, res } = await getReportCheckup({
        ...infoPortal,
        setToken: setInfoPortal,
        id,
      });
      // plan not use feature
      if (code === 400) {
        onNotExport();
        setIsLoadingDownload(false);
        return;
      }

      if (code === 200) {
        if (!res) return setIsLoadingDownload(false);
        const dataBlob = await res.blob();
        downloadFile(dataBlob);
      }

      setIsLoadingDownload(false);
    },
    [infoPortal, setInfoPortal]
  );

  const downloadFile = useCallback((blob: Blob) => {
    const fileName = `Speed Performance Monthly Check-up - ${
      customer?.domain
    } - ${formatDateNameMonthYYYY("")}.docx`;

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.docx`);
    document.body.appendChild(link);
    link.click();
  }, []);

  return (
    <Button
      plain
      loading={isLoadingDownload}
      onClick={() => {
        onExportCheckup(id);
      }}
    >
      {t("common.btn_view")}
    </Button>
  );
}

interface IButtonExportExpertCare {
  id: number;
  onNotExport: () => void;
}
export default ButtonExportExpertCare;
