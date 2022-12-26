import React, { CSSProperties } from 'react';

export interface SkzSwitchProps {
    checked: boolean,
    onChange: (willBeChecked: boolean) => void,
    color?: string,
    offColor?: string,
    size?: number
}

const Switch = ({checked, onChange, color = '#009BE6', offColor = '#bbb', size = 35}: SkzSwitchProps) => {

    const handleSwitch = () => onChange(!checked);

    return (
        <div className="skz-switch" onClick={handleSwitch}>
            <div 
                className="skz-switch" 
                style={{
                    ..._sSwitch,
                    backgroundColor: checked ? color : offColor,
                    opacity: .4,
                    width: size,
                    height: size / 2.5,
                    borderRadius: size / 2.5
                }} 
                onClick={handleSwitch}
            >
            </div>
            <div 
                className="skz-switch_thumb" 
                style={{
                    ..._sThumb,
                    width: size * .6,
                    height: size * .6,
                    right: checked ? '100%' : 0,
                    transform: checked ? 'translate(70%, -50%)' : 'translate(30%, -50%)',
                    backgroundColor: checked ? color : offColor
                }}
            >

            </div>
        </div>
    )
};

//#region Styles

const _sSwitch: CSSProperties = {
    position: 'relative',
    backgroundColor: '#aaa',
    cursor: 'pointer'
}

const _sThumb: CSSProperties = {
    position: 'absolute',
    top: '50%',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    transition: '.2s ease',
    cursor: 'pointer'
}

//#endregion

export default Switch;