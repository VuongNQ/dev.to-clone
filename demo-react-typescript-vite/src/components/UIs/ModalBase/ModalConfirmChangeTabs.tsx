/* Packages */

import iconModalWarning from "@swift/assets/svg/modal/warning.svg";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import Parse from "html-react-parser";
import { useTranslation } from "react-i18next";

const ModalConfirmChangeTabs = ({
  onPrimaryAction,
  isOpen,
  onClose,
}: ModalConfirmChangeTabsType) => {
  const {t} = useTranslation()

  return (
    <ModalBaseInfo
      isOpenModal={isOpen}
      icon={iconModalWarning}
      // isIconImage={true}
      title_header={t('modal.boostSEO.confirm_redirect.title_header')}
      des={Parse(t('modal.boostSEO.confirm_redirect.des')) as JSX.Element}
      titlePrimaryAction={t('modal.boostSEO.confirm_redirect.title_primary_action')}
      onPrimaryAction={() => {
        onPrimaryAction();
        // onClose()
      }}
      titleSecondaryAction={t('modal.boostSEO.confirm_redirect.title_secondary_action')}
      onSecondaryAction={onClose}
      isDestructive={true}
      onCloseAction={onClose}
    />
  );
};

interface ModalConfirmChangeTabsType {
  isOpen: boolean;
  onClose: () => void;
  onPrimaryAction: () => void;
}
export default ModalConfirmChangeTabs;
