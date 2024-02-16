/* Packages */
import { Button, Text } from "@shopify/polaris";
import iconModalUninstall from "@swift/assets/svg/general/icon-sad.svg";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import { queryKeys } from "@swift/queryKeys";
import { useGeneralAppService } from "@swift/services/generalAppApi";
import { ModalBaseInfoType } from "@swift/types/general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";

const DeActiveApp = () => {
	const { t } = useTranslation();

	const { callSetAppLock } = useGeneralAppService();

	const { onRedirectApp } = useFuncRedirect();

	const queryClient = useQueryClient();

	const {
		isOpen: isOpenModal,
		onClose: onCloseModal,
		onOpen: onOpenModal,
	} = useDisclosure({ defaultIsOpen: false });

	const deActiveAction = useMutation({
		mutationFn: () => callSetAppLock(true),
		onSuccess(res) {
			const {status} = res

			if(status){
				queryClient.invalidateQueries({ queryKey: queryKeys.customer.detail().queryKey })
			}else{
				onRedirectApp('/un-install')
			}
		
		},
	});

	const [modalSetting] = useState<ModalBaseInfoType | null>({
		title_header: "modal.setting.uninstall.title_header",
		title: "modal.setting.uninstall.title",
		des: "modal.setting.uninstall.des",
		icon: iconModalUninstall,
		titlePrimaryAction: "common.btn_uninstall",
		onPrimaryAction: deActiveAction.mutate,
		titleSecondaryAction: "common.btn_cancel",
		isDestructive: true,
		isOutline: true,
	});

	return (
		<>
			<Button outline onClick={onOpenModal}>
				{t("common.btn_uninstall")}
			</Button>
			<ModalBaseInfo
				titleHidden={modalSetting?.titleHidden}
				isOpenModal={isOpenModal}
				icon={modalSetting?.icon || ""}
				title_header={t(`${modalSetting?.title_header}`)}
				des={t(`${modalSetting?.des}`)}
				titlePrimaryAction={t(`${modalSetting?.titlePrimaryAction}`)}
				onPrimaryAction={modalSetting?.onPrimaryAction}
				title={
					<Text as="h4" variant="headingLg" color="critical">
						{t(`${modalSetting?.title}`)}
					</Text>
				}
				titleSecondaryAction={t(`${modalSetting?.titleSecondaryAction}`)}
				onSecondaryAction={onCloseModal}
				isDestructive={modalSetting?.isDestructive}
				isLoadingPrimaryAction={deActiveAction.isLoading}
				onCloseAction={onCloseModal}
				isOutline={modalSetting?.isOutline}
				isSmall={true}
			/>
		</>
	);
};

export default DeActiveApp;
