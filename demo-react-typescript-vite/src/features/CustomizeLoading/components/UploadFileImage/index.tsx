import { DropZone, Banner, Icon } from "@shopify/polaris";
import { useState, useEffect } from "react";
import { DeleteMinor } from "@shopify/polaris-icons";
//styles
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface UploadFileImageType {
  disabled?: boolean;
  image: string | File | null;
  setFile: ( image: string | File | null)=>void;
}
function UploadFileImage({
  disabled = false,
  image = null,
  setFile,
}: UploadFileImageType) {
  const { t } = useTranslation();

  const [files, setFiles] = useState<File | string | null>(
    image ? image : null
  );
  const [rejectedFiles, setRejectedFiles] = useState<string | null>(null);
  const hasError = rejectedFiles ? true : false;

  useEffect(() => {
    setFiles(image);
  }, [image]);

  const handleDrop = (
    _droppedFiles: File[],
    acceptedFiles: File[],
    rejectedFiles: File[]
  ) => {
    if (rejectedFiles[0]) {
      /** validate format */
      setRejectedFiles("error_format");
    } else if (acceptedFiles[0].size > 1024 * 1024 * 5) {
      /** validate size */
      setRejectedFiles("error_size");
      acceptedFiles[0] = null as unknown as File;
    } else {
      if (rejectedFiles !== null) {
        setRejectedFiles(null);
      }
    }

    if (acceptedFiles[0]) {
      setFiles(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    } else {
      //     setFiles(null);
      setFile(null);
    }
  };

  const onDeleteFile = () => {
    setFile("");
  };

  const fileUpload = !files && (
    <p className="UploadFileImage__upload-preview">Browser image</p>
  );
  const uploadedFiles = files && (
    <div className="UploadFileImage__upload-preview">
      {files ? (
        typeof files === "object" || typeof files === "string" ? (
          <>
            <div className="UploadFileImage__delete">
              <div className="UploadFileImage__delete-background"></div>
              <div
                className="UploadFileImage__wrapper-icon"
                onClick={onDeleteFile}
              >
                <Icon source={DeleteMinor} color="base" />
              </div>
            </div>
            <img
              loading="lazy"
              className="UploadFileImage__upload-img"
              src={
                typeof files === "string"
                  ? files
                  : window.URL.createObjectURL(files)
              }
              alt="backgroun image"
            />
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );

  const errorMessage = hasError && (
    <Banner
      title={t("message_error_input.upload_file.title")}
      status="critical"
      onDismiss={() => {
        setRejectedFiles(null);
      }}
    >
      {rejectedFiles === "error_format" && (
        <p>{t("message_error_input.upload_file.message.0")}</p>
      )}
      {rejectedFiles === "error_size" && (
        <p>{t("message_error_input.upload_file.message.1")}</p>
      )}
    </Banner>
  );

  return (
    <>
      <div className="UploadFileImage" style={{ height: 150 }}>
        <DropZone
          disabled={disabled}
          allowMultiple={false}
          accept="image/jpeg,image/png,image/gif"
          type="image"
          onDrop={handleDrop}
        >
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </div>
      {errorMessage}
    </>
  );
}

export default UploadFileImage;
