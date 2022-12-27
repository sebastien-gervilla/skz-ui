import React, { CSSProperties, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface SnackbarProps {
    open: boolean,
    onClose: () => void,
    message: string,
    buttonText: string,
    className: string,
    closeDelay?: number | null
}

const Snackbar = ({open, onClose, message, buttonText = 'UNDO', className = '', closeDelay = null}: SnackbarProps) => {

    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!closeDelay || closeDelay < 0) return;
        timeoutRef.current && clearTimeout(timeoutRef.current);

        if (open)
            timeoutRef.current = setTimeout(onClose, closeDelay);
    
        return () => { timeoutRef.current && clearTimeout(timeoutRef.current) };
      }, [closeDelay, onClose, open]);

    const handleClose = (event: React.MouseEvent): void => {
        event.preventDefault();
        onClose();
    }

    return open ? ReactDOM.createPortal(
        <div className={"skz-snackbar" + (className ? ` ${className}` : '')} style={_sSnackbar}>

            <p className='skz-snackbar_message' style={_sText}>{message}</p>
            <button className='skz-snackbar_close-btn' onClick={handleClose} style={_sButton}>{buttonText}</button>

        </div>
    , document.body) : null;
};

//#region Styles

const _sSnackbar: CSSProperties = {
    position: 'absolute',
    left: '2.5vh',
    bottom: '2.5vh', 
    display: 'flex',
    maxWidth: '25vw',
    padding: 15,
    textAlign: 'left',
    backgroundColor: '#123',
    color: 'white',
    boxShadow: 'rgba(100, 100, 100, 0.35) 0px 7px 29px 0px'
}

const _sText: CSSProperties = {
    fontSize: 16,
    margin: 0,
    marginRight: 30
}

const _sButton: CSSProperties = {
    padding: 0,
    backgroundColor: 'transparent',
    color: 'unset',
    fontSize: 16,
    border: 'none',
    cursor: 'pointer'
}

//#endregion

export default Snackbar;