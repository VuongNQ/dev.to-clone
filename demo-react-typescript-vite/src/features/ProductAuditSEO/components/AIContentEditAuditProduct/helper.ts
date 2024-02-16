/** get string comments/Suggestions */
const getCommentsSuggestions = (paragraph: string) => {
    const regexNumberList = /(([0-9]+)(\.)) /g;
    const lengthCommentsSuggestions = "comments/Suggestions:".length;
    const positionCommentSuggest = regexIndexOf(
        paragraph,
        /(comments\/Suggestions)/i,
        0
    );

    const positionEnd = regexIndexOf(
        paragraph,
        /((\nWell-Optimized Product))/,
        0
    );

    if (positionCommentSuggest < 1) return "";

    let stringCommentSuggest = "";
    if (positionEnd < 1) {
        // if not find 'Well-Optimized Product' get string to end
        stringCommentSuggest = paragraph.slice(
            positionCommentSuggest + lengthCommentsSuggestions
            // positionEnd
        );
    } else {
        stringCommentSuggest = paragraph.slice(
            positionCommentSuggest + lengthCommentsSuggestions,
            positionEnd
        );
    }

    let stringCommentSuggestOutput = stringCommentSuggest;

    /*comments/Suggestions*/
    // case variable stringCommentSuggestOutput has number list => add newline every number list, else add newline,dash to clear
    if (regexNumberList.test(stringCommentSuggestOutput)) {
        const newStringCommentSuggestNumberList =
            stringCommentSuggestOutput.replace(
                regexNumberList,
                (valueString) => {
                    const regexNumber1 = /((1)(\.)) /g;

                    if (regexNumber1.test(valueString)) {
                        return valueString;
                    }
                    return `\n${valueString} `;
                }
            );
        stringCommentSuggestOutput = newStringCommentSuggestNumberList;
    } else {
        // case has .\n = > add one new line, else  add two new line to clear
        if (/(\.\n)/g.test(stringCommentSuggestOutput)) {
            const newCommentSuggest1 = stringCommentSuggestOutput.replace(
                /(\.\n)/g,
                "$1\n "
            );
            stringCommentSuggestOutput = newCommentSuggest1;
        } else {
            const newCommentSuggest2 = stringCommentSuggestOutput.replace(
                /(\.) /g,
                "$1\n\n- "
            );
            stringCommentSuggestOutput = `-${newCommentSuggest2}`;
        }
    }
    /*comments/Suggestions*/

    /**'Overall,' => break to one block to the end */
    if (/((Overall,))/.test(stringCommentSuggestOutput)) {
        if (/((\n- Overall,))/.test(stringCommentSuggestOutput)) {
            return stringCommentSuggestOutput;
        }

        const stringOverall = stringCommentSuggestOutput.replace(
            /((Overall,))/,
            // regexNumberList.test(stringCommentSuggestOutput) ?  "\n- $1" :  "\n $1"
            /((\n Overall,))/.test(stringCommentSuggestOutput)
                ? "- $1"
                : "\n $1"
        );

        stringCommentSuggestOutput = stringOverall;
    }
    /**'Overall,' => Overall, break to one block to the end */

    return stringCommentSuggestOutput;
};
/**end  get string comments/Suggestions */

/** get string optimize well */
const getOptimizeWell = (paragraph: string) => {
    const lengthTitle = "\nWell-Optimized Product Elements:".length;
    const positionOptimizedWell = regexIndexOf(
        paragraph,
        /((\nWell-Optimized Product Elements:))/i,
        0
    );

    const positionEnd = regexIndexOf(
        paragraph,
        /((\nPoorly-Optimized Product Elements:))/i,
        0
    );

    if (positionOptimizedWell < 1) return "";

    const stringOptimizeWell = paragraph.slice(
        positionOptimizedWell + lengthTitle,
        positionEnd
    );

    return stringOptimizeWell;
};
/**end  get string optimize well */

/** get string optimize poorly */
const getOptimizePoorly = (paragraph: string) => {
    const lengthTitle = "\nPoorly-Optimized Product Elements:".length;
    const positionCommentSuggest = regexIndexOf(
        paragraph,
        /((\nPoorly-Optimized Product Elements:))/i,
        0
    );

    if (positionCommentSuggest < 1) return "";

    const stringOptimizePoorly = paragraph.slice(
        positionCommentSuggest + lengthTitle
    );

    return stringOptimizePoorly;
};
/**end  get string optimize poorly */

/** find position of string by regex */
const regexIndexOf = (string: string, regex: RegExp, startpos: number) => {
    const indexOf = string.substring(startpos || 0).search(regex);
    return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};
/**end find position of string by regex */

export const convertDataStringToDataObject = (paragraph: string) => {
    const parseCommentsSuggestions = getCommentsSuggestions(paragraph);

    const parseOptimizeWell = getOptimizeWell(paragraph);

    const parseOptimizePoorly = getOptimizePoorly(paragraph);

    return {
        suggest: parseCommentsSuggestions,
        listWell:
            parseOptimizeWell.length > 1 && parseOptimizeWell.includes(",")
                ? parseOptimizeWell.split(",")
                : [],
        listPoor:
            parseOptimizePoorly.length > 1 && parseOptimizePoorly.includes(",")
                ? parseOptimizePoorly.split(",")
                : [],
    };
};
