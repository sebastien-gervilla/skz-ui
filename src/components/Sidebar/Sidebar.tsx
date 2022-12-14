import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface SkzModalProps {
    open: boolean,
    onClose: () => void,
    body: ReactNode,
    side: string,
    className: string,
    keepFocus: boolean
}

const Sidebar = ({open, onClose, body, side = 'left', className = '', keepFocus = false}: SkzModalProps) => {

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

    const validSide = (side: string): string => side === 'left' || side === 'right' ? side : 'left';

    return open && ReactDOM.createPortal(
        <div className={"skz-side-bar" + (className ? ` ${className}` : '')} style={{..._sSidebar, [validSide(side)]: 0}} ref={modalRef}>

            { body }

        </div>
    , document.body)
};

//#region Styles

const _sSidebar: CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    boxShadow: 'rgba(100, 100, 100, 0.3) 0px 7px 30px 0px'
}

//#endregion

export default Sidebar;