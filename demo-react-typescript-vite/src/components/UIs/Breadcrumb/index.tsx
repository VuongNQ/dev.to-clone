import { Link } from "@shopify/polaris";
import { memo } from "react";
import { useMemo } from "react";
import "./styles.scss";

const Breadcrumb = memo(function _({ listBreadcrumb }: IBreadcrumb){
  const displayLink = useMemo(() => {
    const lengthArr = listBreadcrumb.length - 1;
    const element = listBreadcrumb.map((item, index) =>
      lengthArr === index ? (
        <span key={item.label + index}>{item.label}</span>
      ) : (
        <span key={item.label + index}>
          <Link url={item.destination} removeUnderline monochrome>
            {item.label}
          </Link>
          {" / "}
        </span>
      )
    );

    return element;
  }, [listBreadcrumb]);

  return (
    <div className="Breadcrumb">{displayLink}</div>
  );
});

interface IBreadcrumb {
  listBreadcrumb: IItemBreadcrumb[];
}

interface IItemBreadcrumb {
  label: string;
  destination: string;
}

export default Breadcrumb;
