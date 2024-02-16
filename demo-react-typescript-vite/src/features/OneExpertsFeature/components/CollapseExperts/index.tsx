import {
    Button,
    Collapsible,
    Icon,
} from '@shopify/polaris';

import { useState } from 'react';

import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';

import './styles.scss';

interface CollapseExpertstype {
    title: string;
    children: JSX.Element;
}

export default function CollapseExperts({
    title = '',
    children,
}: CollapseExpertstype) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div className="collapse-experts">
            <div
                style={{
                    position: 'absolute',
                    content: '',
                    top: '0',
                    left: '0',
                    height: '100%',
                    width: '8px',
                    backgroundColor: 'var(--p-border-subdued)',
                    zIndex: '2',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    visibility: open ? 'visible' : 'hidden',
                }}
            />
            <Button
                fullWidth
                textAlign="left"
                onClick={handleToggle}
                ariaExpanded={open}
                icon={
                    <Icon
                        color="base"
                        source={open ? ChevronUpMinor : ChevronDownMinor}
                    />
                }
                ariaControls="collapse-experts"
            >
                {title}
            </Button>
            <Collapsible
                open={open}
                id="collapse-experts"
                transition={{
                    duration: '500ms',
                    timingFunction: 'ease-in-out',
                }}
                expandOnPrint
            >
                <div className="collapse-experts__des">{children}</div>
            </Collapsible>
        </div>
    );
}
