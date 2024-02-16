import {
    IndexTable,
    SkeletonDisplayText,
    SkeletonThumbnail,
} from "@shopify/polaris";
import { memo, useMemo } from "react";
import "./styles.scss";

const SkeletonTableMemo = ({
    numberRow,
    numberCol,
    isUseImage = false,
}: ISkeletonTable) => {
    const displayElement = useMemo(() => {
        const listRow: number[] = [...Array(numberRow)];
        const listCol: number[] = [
            ...Array(isUseImage ? numberCol - 1 : numberCol),
        ];

        return listRow.map((item, index) => {
            const id = (new Date().getTime() + index).toString();

            const elementCol = listCol.map((_,index) => (
                <IndexTable.Cell key={`${id}-elementCol-${index}`}>
                    <div className="SkeletonTable__text">
                        <SkeletonDisplayText />
                    </div>
                </IndexTable.Cell>
            ));

            return (
                <IndexTable.Row id={id} key={id} position={item}>
                    {isUseImage && (
                        <IndexTable.Cell key={`${id}-listRow-${index}`}>
                            <div className="SkeletonTable__img">
                                <SkeletonThumbnail />
                            </div>
                        </IndexTable.Cell>
                    )}
                    {elementCol}
                </IndexTable.Row>
            );
        });
    }, []);

    return <>{displayElement}</>;
};

const SkeletonTable = memo(SkeletonTableMemo);

interface ISkeletonTable {
    numberRow: number;
    numberCol: number;
    isUseImage?: boolean;
    isUseBtnCheck?: boolean;
}

export default SkeletonTable;
