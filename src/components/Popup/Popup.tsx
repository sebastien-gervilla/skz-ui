import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { getPopupStyles, PopupPosition } from './utils';

export interface SkzPopupProps {
    open: boolean,
    anchor: HTMLElement,
    position: PopupPosition,
    onClose: () => void,
    body: ReactNode,
    keepFocus?: boolean,
    darkenBackground?: boolean
}

const Popup = ({open, anchor, position, onClose, body, keepFocus = false, darkenBackground = false}: SkzPopupProps) => {

    const popupRef = useRef<HTMLDivElement>(null);

    const popupPosition = getPopupStyles(anchor, position);

    const getWrapperStyles = () => {
        return {
            ..._sPopupWrapper,
            backgroundColor: darkenBackground ? 
                'rgba(100, 100, 100, 0.2)' : 'transparent'
        }
    }

    useEffect(() => {
        const handleClickOut = (event: MouseEvent) => {
            const popup = popupRef.current;
            if (popup && !popup.contains(event.target as Node))
                onClose();
        }

        !keepFocus && document.addEventListener('mousedown', handleClickOut);

        return () => { !keepFocus && document.removeEventListener('mousedown', handleClickOut) };
    }, [popupRef, onClose, keepFocus]);

    return open && ReactDOM.createPortal(
        <div className="skz-popup_wrapper" style={getWrapperStyles()}>
            <div 
                className={"skz-popup" + popupPosition.top}
                ref={popupRef} 
                style={{
                    ..._sPopup, 
                    ...popupPosition
                }}>

                { body }

            </div>
        </div>
    , document.body)
};

//#region Styles

const _sPopupWrapper: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
}

const _sPopup: CSSProperties = {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: 'rgba(100, 100, 111, 0.35) 0px 7px 35px 0px'
}

//#endregion

export default Popup;