export const getTextInHtml = (htmlString: string) => {
  const range = document.createRange();
  // binding content la String vao collection tao ra 1 collection DOM
  const fragment = range.createContextualFragment(htmlString);

  if (!fragment.childNodes || !fragment.childNodes.length) return "";

  // tag not allow to prevent XSS attack and remove dom unnecessary
  const tagsNotAllow = ["SCRIPT", "STYLE", "LINK", "META", "#comment"];
  let content = "";
  fragment.childNodes.forEach((x) => {
    if (x.nodeName && !tagsNotAllow.includes(x.nodeName)) {
      // console.log('x.tagName && x.nodeName', x.tagName, x.nodeName);

      content += x.textContent || "";
      // content += x.textContent || x.innerText  || '';
    }
  });
  return content;
};

export const convertBytesToFormat = (
  num = 0,
  precision = 3,
  addSpace = true
) => {
  const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (Math.abs(num) < 1) return num + (addSpace ? " " : "") + UNITS[0];
  const exponent = Math.min(
    Math.floor(Math.log10(num < 0 ? -num : num) / 3),
    UNITS.length - 1
  );
  const n = Number(
    ((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision)
  );
  return (num < 0 ? "-" : "") + n + (addSpace ? " " : "") + UNITS[exponent];
};

export const parseQueryString = (params = {}) =>
  new URLSearchParams(params).toString();

export const removeDuplicateSpaces = (str: string): string => {
  return str.replace(/\s+/g, " ").trim();
};

export const stripHtml = (htmlString: string) => htmlString.replace(/<[^>]+>/g, '');

// https://linuxhint.com/strip-html-tags-from-string-javascript/
export const stripTags = (htmlString: string) => {
  const parseHTML = new DOMParser().parseFromString(htmlString, "text/html");
  return parseHTML.body.textContent || "";
}

export const isValidJSON = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};
