import { Thumbnail } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import { memo, useEffect, useState } from "react";

export const RenderThumbnail = memo(function _({
    url = "",
    alt = "",
    size = "small",
}: {
    url: string;
    alt?: string | undefined | null;
    size?: "extraSmall" | "small" | "medium" | "large";
}) {
    const [isError, setIsError] = useState(true);

    useEffect(() => {
		if(!url.length) return;
        const detectError = new Image();
        detectError.onload = () => setIsError(false);
        detectError.src = url;
    }, [url]);

    if (isError)
        return <Thumbnail source={ImageMajor} alt={alt || ""} size={size} />;

    return <Thumbnail source={url} alt={alt || ""} size={size} />;
});
