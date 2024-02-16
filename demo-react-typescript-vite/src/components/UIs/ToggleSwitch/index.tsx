import { Spinner } from "@shopify/polaris";
import "./styles.scss";

const ToggleSwitch: React.FC<toggleSwitchProps> = ({
  label,
  isActive = false,
  onChangeActive,
  disabled = false,
  classAdds = "",
  loading = false,
}: toggleSwitchProps) => {
  return (
    <div className={`${classAdds || ""}`}>
      {loading ? (
        <Spinner accessibilityLabel="ToggleSwitch" size="small" />
      ) : (
        <>
          <input
            disabled={disabled}
            id="s2"
            type="checkbox"
            className="switch"
            checked={isActive}
            onChange={onChangeActive}
          />
          <label htmlFor="s2">{label}</label>
        </>
      )}
    </div>
  );
};

interface toggleSwitchProps {
  label?: string;
  isActive: boolean;
  classAdds?: string;
  disabled?: boolean;
  onChangeActive: (event: React.FormEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

export default ToggleSwitch;
