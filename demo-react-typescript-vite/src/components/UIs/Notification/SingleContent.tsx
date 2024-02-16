import { Spinner, Text } from '@shopify/polaris';
import './styles.scss';

const NotifySingleContent: React.FC<INotifySingleContent> = ({ isOnProcess = false, after = '', title = '' }:INotifySingleContent) => {
    return (
        <div className="Notification">
            <div className="Notification__btn flex items-center justify-between single">
                <div className="flex items-center">
                    {isOnProcess && <Spinner size="small" />}
                    <Text as="h2" variant="headingMd">
                        {title}
                    </Text>
                </div>
                <span>{after}</span>
            </div>
        </div>
    );
};

interface INotifySingleContent{
    isOnProcess?: boolean;
    after?: string;
    title?: string;
}
export default NotifySingleContent;
