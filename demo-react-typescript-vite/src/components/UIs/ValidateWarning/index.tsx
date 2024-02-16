import { Button } from "@shopify/polaris";
import "./styles.scss";
import { CancelMinor } from "@shopify/polaris-icons";

function ValidateWarning({ message, isOpen, onClose }: IValidateWarning) {
  if (!isOpen) return <></>;

  return (
    <div className="ValidateWarning p-2 position-r mt-1">
      <p className="ValidateWarning__message">{message}</p>
      <div className="ValidateWarning__btn-cancel position-a">
        <Button onClick={onClose} plain icon={CancelMinor}></Button>
      </div>
    </div>
  );
}

interface IValidateWarning {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default ValidateWarning;
