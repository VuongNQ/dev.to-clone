/* Packages */
import { Button, Icon, Modal, Text, Tooltip } from "@shopify/polaris";

import { DuplicateMinor } from "@shopify/polaris-icons";
import useCopyToClipboard from "@swift/hooks/useCopyToClipboard";
import { ModalBaseInfoType } from "@swift/types/general";
import React, {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Trans, useTranslation } from "react-i18next";
import "./styles.scss";

const ModalBaseInfoMemo: React.FC<PropsWithChildren<ModalBaseInfoType>> = ({
  isOpenModal = false,
  title_header = "",
  title = "",
  icon = "",
  // isIconImage = false,
  des = "",
  titleSecondaryAction,
  titlePrimaryAction = "",
  onPrimaryAction,
  onSecondaryAction,
  isDestructive = false,
  isLoadingPrimaryAction = false,
  isLoadingSecondaryAction = false,
  titleHidden = false,
  onCloseAction,
  isOutline = false,
  errorID,
  isDisablePrimaryAction,
  isDisableSecondaryAction = false,
  desKey = "",
  isSmall = true,
  children,
}: PropsWithChildren<ModalBaseInfoType>) => {
  const { t } = useTranslation();
  const { copy } = useCopyToClipboard();

  const [messageCopy, setMessageCopy] = useState("common.txt_copy");

  const handleSetMessageCopy = useCallback(() => {
    setMessageCopy("common.txt_copied");
  }, []);

  useEffect(() => {
    return () => {
      setMessageCopy("common.txt_copy");
    };
  }, []);

  const renderContent = (
    <div className="flex flex-col gap-5 item-center">
      {icon && (
        <div className="text-center">
          <img className="ModalBaseInfo__img" src={icon} alt="icon" />
        </div>
      )}

      <div className="flex flex-col gap-2 item-center">
        {/* {title && <div className="ModalBaseInfo__title">{title}</div>} */}
        {title && typeof title == "string" ? (
          <Text alignment="center" as="h4" variant="headingLg" color="success">
            {title}
          </Text>
        ) : (
          title
        )}

        <div className="ModalBaseInfo__des">
          {desKey.length ? (
            <Trans
              i18nKey={desKey}
              components={{ break: <br />, bold: <strong /> }}
            />
          ) : (
            des
          )}
        </div>
      </div>

      {errorID && (
        <div className="ModalBaseInfo__id-error flex justify-between gap-5 items-center mt-4 ">
          <p>
            {t("common.txt_error_id")} {errorID}
          </p>
          <Tooltip content={t(messageCopy)}>
            <a className="ModalBaseInfo__btn-copy flex items-center justify-center">
              <Button
                onClick={() => {
                  copy(errorID);
                  handleSetMessageCopy();
                }}
                plain
                size="slim"
                icon={<Icon source={DuplicateMinor} color="base" />}
              ></Button>
            </a>
          </Tooltip>
        </div>
      )}
    </div>
  );

  if (children) {
    return (
      <Modal
        titleHidden={titleHidden}
        small={isSmall}
        open={isOpenModal}
        onClose={() => {
          onCloseAction && onCloseAction();
        }}
        title={title_header}
        primaryAction={{
          content: titlePrimaryAction,
          onAction: () => {
            onPrimaryAction && onPrimaryAction();
          },
          destructive: isDestructive,
          outline: isOutline,
          loading: isLoadingPrimaryAction,
          disabled: isDisablePrimaryAction,
        }}
        secondaryActions={[
          {
            content: titleSecondaryAction,
            onAction: () => {
              onSecondaryAction && onSecondaryAction();
            },
            loading: isLoadingSecondaryAction,
            disabled: isDisableSecondaryAction,
          },
        ]}
      >
        <Modal.Section>{children}</Modal.Section>
      </Modal>
    );
  }

  if (titleSecondaryAction) {
    return (
      <Modal
        titleHidden={titleHidden}
        small={isSmall}
        open={isOpenModal}
        onClose={() => {
          onCloseAction && onCloseAction();
        }}
        title={title_header}
        primaryAction={{
          content: titlePrimaryAction,
          onAction: () => {
            onPrimaryAction && onPrimaryAction();
          },
          destructive: isDestructive,
          outline: isOutline,
          loading: isLoadingPrimaryAction,
          disabled: isDisablePrimaryAction,
        }}
        secondaryActions={[
          {
            content: titleSecondaryAction,
            onAction: () => {
              onSecondaryAction && onSecondaryAction();
            },
            loading: isLoadingSecondaryAction,
            disabled: isDisableSecondaryAction,
          },
        ]}
      >
        {/* <Modal.Section>{renderContent}</Modal.Section> */}
        <Modal.Section>{renderContent}</Modal.Section>
      </Modal>
    );
  }

  return (
    <Modal
      titleHidden={titleHidden}
      open={isOpenModal}
      small={isSmall}
      onClose={() => {
        onCloseAction && onCloseAction();
      }}
      title={title_header}
      primaryAction={{
        content: titlePrimaryAction,
        onAction: () => {
          onPrimaryAction && onPrimaryAction();
        },
        destructive: isDestructive,
        outline: isOutline,
        loading: isLoadingPrimaryAction,
        disabled: isDisablePrimaryAction,
      }}
    >
      <Modal.Section>{renderContent}</Modal.Section>
    </Modal>
  );
};

const ModalBaseInfo = memo(ModalBaseInfoMemo);

export default ModalBaseInfo;
