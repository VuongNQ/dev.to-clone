import { Collapsible, Icon, Spinner, Text } from '@shopify/polaris';
import {
    ChevronDownMinor,
    ChevronUpMinor,
} from '@shopify/polaris-icons';
import './styles.scss';

const NotiCollapsible: React.FC<INotiCollapsible> = ({
    isOpen,
    title = '',
    isOnProcess = false,
    prependIcon,
    children,
    onCollapse,
}:INotiCollapsible) => {

    return (
        <div className="Notification">
            <div
                className="Notification__btn flex items-center justify-between"
                onClick={() => {
                    // setOpen && setOpen();
                    onCollapse && onCollapse();
                }}
            >
                <div className="flex items-center">
                    {isOnProcess ? (
                        <Spinner size="small" />
                    ) : prependIcon ? (
                        prependIcon
                    ) : (
                        ''
                    )}
                    <Text as="h2" variant="headingMd">
                        {title}
                    </Text>
                </div>
                <Icon source={isOpen ? ChevronUpMinor : ChevronDownMinor} />
            </div>
            <Collapsible
                open={isOpen}
                id="basic-collapsible"
                transition={{
                    duration: '500ms',
                    timingFunction: 'ease-in-out',
                }}
                expandOnPrint
            >
                {children}
            </Collapsible>
        </div>
    );
};

interface INotiCollapsible{
    isOpen: boolean,
    isOnProcess?: boolean;
    prependIcon?: JSX.Element | null;
    title?: string | JSX.Element;
    children?: React.ReactNode;
    onCollapse: () => void;
}

export default NotiCollapsible;
