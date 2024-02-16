import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic"

const SkeletonTransaction = ({isLast = false}:{isLast?: boolean}) => {
    return <div
        className="flex items-center justify-between Profile-right__history-body__list-detail"
    >
        <div className="flex flex-col gap-1">
            <SkeletonBasic width="149px" height="20px" />
            <SkeletonBasic width="283px" height="16px" />
            <SkeletonBasic width="283px" height="16px" />
            {!isLast ? <SkeletonBasic width="283px" height="16px" /> : ""}
        </div>
        <SkeletonBasic width="30px" height="20px" />
    </div>
}

export {
    SkeletonTransaction
}