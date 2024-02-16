import { useState } from 'react';

export const useDisclosure = ({
    defaultIsOpen = false
}: {
    defaultIsOpen?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const onToggle = () => setIsOpen(!isOpen);

    return {
        isOpen,
        onClose,
        onOpen,
        onToggle,
    };
};
