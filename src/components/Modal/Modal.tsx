import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface SkzModalProps {
    open: boolean,
    onClose: () => void,
    body: ReactNode,
    keepFocus?: boolean
}

const Modal = ({open, onClose, body, keepFocus = false}: SkzModalProps) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOut = (event: MouseEvent) => {
            const modal = modalRef.current;
            if (modal && !modal.contains(event.target as Node))
                onClose();
        }

        !keepFocus && document.addEventListener('mousedown', handleClickOut);

        return () => { !keepFocus && document.removeEventListener('mousedown', handleClickOut) };
    }, [modalRef, onClose, keepFocus]);

    return open && ReactDOM.createPortal(
        <div className="skz-modal_wrapper" style={_sModalWrapper}>
            <div className="skz-modal" style={_sModal} ref={modalRef}>

                { body }

            </div>
        </div>
    , document.body)
};

//#region Styles

const _sModalWrapper: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(100, 100, 100, 0.2)'
}

const _sModal: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff'
}

//#endregion

export default Modal;