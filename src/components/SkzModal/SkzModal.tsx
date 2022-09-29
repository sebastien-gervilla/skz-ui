import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface SkzModalProps {
    open: boolean,
    setOpen: (willOpen: boolean) => void,
    body: ReactNode,
    keepFocus?: boolean
}

const SkzModal = (props: SkzModalProps) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const { open, setOpen, body, keepFocus } = props;

    useEffect(() => {
        console.log("This is testing");
        
        const handleClickOut = (event: MouseEvent) => {
            const modal = modalRef.current;
            if (modal && modal.contains(event.target as Node))
                setOpen(false);
        }

        !keepFocus && document.addEventListener('mousedown', handleClickOut);

        return () => { !keepFocus && document.removeEventListener('mousedown', handleClickOut) };
    }, [modalRef, setOpen, keepFocus]);

    return open && ReactDOM.createPortal(
        <div className="skz-modal_wrapper" style={_sModalWrapper}>
            <div className="skz-modal" style={_sModal} ref={modalRef}>

                { body }

            </div>
        </div>
    , document.getElementById("root") as Element)
};

//#region Styles

const _sModalWrapper: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ccc'
}

const _sModal: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff'
}

//#endregion

export default SkzModal;