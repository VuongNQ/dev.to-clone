import { Banner } from "@shopify/polaris";
import "./styles.scss";

function BannerSpinner({
  title,
  des,
  spinner,
  hideIcon = false,
}: BannerSpinnerType) {
  // const TilteContent = (
  //     <span className="BannerSpinner__info">
  //         <span className="BannerSpinner__title">
  //             Scanning - {getCustomerData?.name}
  //         </span>
  //         <Spinner accessibilityLabel="Publish theme changes" size="small" />
  //     </span>
  // ) as unknown as string;

  const TitleContent = (
    <span className="BannerSpinner__info">
      <span className="BannerSpinner__title">{title}</span>
      {spinner}
    </span>
  ) as unknown as string;

  return (
    <div className="BannerSpinner">
      <Banner title={TitleContent} status="info" hideIcon={hideIcon}>
        {des && <p>{des}</p>}
      </Banner>
    </div>
  );
}
interface BannerSpinnerType {
  title: string;
  des?: string | JSX.Element;
  spinner: JSX.Element;
  hideIcon?: boolean;
}

export default BannerSpinner;
