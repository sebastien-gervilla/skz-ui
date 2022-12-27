import React, { CSSProperties } from 'react';
import { WarningType } from './utils';
import { AiOutlineWarning } from 'react-icons/ai';
import { BiErrorAlt, BiInfoCircle, BiCheckCircle } from 'react-icons/bi';

interface SkzAlertProps {
    type: WarningType,
    message: string,
    colorType?: WarningType,
    showType?: boolean
}

const Alert = ({ type, message, colorType = type, showType = true }: SkzAlertProps) => {

    const iconStyle = {..._sIcon, fill: WarningColors[colorType]};

    const WarningIcons = {
        'Error': <BiErrorAlt style={iconStyle} />,
        'Warning': <AiOutlineWarning style={iconStyle} />,
        'Info': <BiInfoCircle style={iconStyle} />,
        'Success': <BiCheckCircle style={iconStyle} />,
    }

    return (
        <div 
            className="skz-alert" 
            style={{
                ..._sAlert, 
                backgroundColor: WarningColors[colorType] + '18',
                borderLeft: '4px solid ' + WarningColors[colorType]
            }}
        >
            {WarningIcons[type]}
            <p 
                style={{
                    ..._sText, 
                    color: WarningMessageColors[colorType]
                }}
            >
                {showType && 
                <span style={_sType}>
                    {type} -&nbsp;
                </span>}
                {message}
            </p>
        </div>
    );
};

//#region Styles

const _sAlert: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: 15
}

const _sText: CSSProperties = {
    fontSize: 14,
    color: 'inherit',
    margin: 0
}

const _sType: CSSProperties = {
    fontWeight: 600, 
    fontSize: 15
}

const _sIcon: CSSProperties = {
    marginRight: 10,
    width: 25,
    height: 25
}

//#endregion

const WarningColors = {
    'Error': '#D23232',
    'Warning': '#F08200',
    'Info': '#0087D2',
    'Success': '#2D8732',
}

const WarningMessageColors = {
    'Error' : '#822323',
    'Warning' : '#7D4B00',
    'Info' : '#005F91',
    'Success' : '#286928',
}

export default Alert;