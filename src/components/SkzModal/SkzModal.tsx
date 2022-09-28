import React, { ReactNode, useEffect, useRef } from 'react';

export interface SkzModalProps {
    setOpen: (willOpen: boolean) => void,
    body: ReactNode,
    keepFocus?: boolean
}

const SkzModal = (props: SkzModalProps) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const { setOpen, body, keepFocus } = props;

    useEffect(() => {
        const handleClickOut = (event: MouseEvent) => {
            const modal = modalRef.current;
            if (modal && modal.contains(event.target as Node))
                setOpen(false);
        }

        keepFocus && document.addEventListener('mousedown', handleClickOut);

        return () => document.removeEventListener('mousedown', handleClickOut);
    }, [modalRef, setOpen, keepFocus]);

    return (
        <div className="skz-modal_wrapper">
            <div className="skz-modal" ref={modalRef}>

                { body }

            </div>
        </div>
    );
};

export default SkzModal;