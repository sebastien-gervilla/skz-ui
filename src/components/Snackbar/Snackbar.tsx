import React, { CSSProperties, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTimeout } from '../../index';

export interface SnackbarProps {
    open: boolean,
    onClose: () => void,
    message: string,
    buttonText: string,
    className: string,
    closeDelay?: number | null
}

const Snackbar = ({open, onClose, message, buttonText = 'UNDO', className = '', closeDelay = null}: SnackbarProps) => {

    const [show, setShow] = useState(open);
    useEffect(() => setShow(open), [open]);

    show && useTimeout(onClose, closeDelay);

    const handleClose = (event: React.MouseEvent): void => {
        event.preventDefault();
        onClose();
    }

    return show && ReactDOM.createPortal(
        <div className={"skz-snackbar" + className ? ` ${className}` : ''} style={_sSnackbar}>

            <p className='skz-snackbar_message' style={_sText}>{message}</p>
            <button className='skz-snackbar_close-btn' onClick={handleClose} style={_sButton}>{buttonText}</button>

        </div>
    , document.body)
};

//#region Styles

const _sSnackbar: CSSProperties = {
    position: 'absolute',
    left: '2.5vh',
    bottom: '2.5vh', 
    display: 'flex',
    maxWidth: '25vw',
    padding: 15,
    fontFamily: 'Helvetica, Arial',
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