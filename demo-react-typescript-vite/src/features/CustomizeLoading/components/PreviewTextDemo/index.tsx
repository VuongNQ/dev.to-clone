import { formTextType, keyScreen } from "../../type";

function PreviewTextDemo({
  screen,
  formText,
}: {
  screen: keyScreen;
  formText: formTextType;
}) {
  return (
    <p
      className={`preview-loading-text__${screen} preview-loading-text fw-${formText.fontWeight} fz-${formText.size}`}
      style={{
        color: formText.color,
        fontFamily: formText.font,
        zIndex: 10,
        wordBreak: "break-word",
        order: formText.positionIndex,
      }}
    >
      {`${formText.text}`}
    </p>
  );
}

export default PreviewTextDemo;
