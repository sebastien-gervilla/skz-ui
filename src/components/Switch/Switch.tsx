import React, { CSSProperties } from 'react';

export interface SwitchProps {
    isOn: boolean,
    onChange: (nextState: boolean) => void,
    color: string
}

const Switch = ({ isOn, onChange, color }: SwitchProps) => {

    const handleSwitch = () => onChange(!isOn);

    return (
        <div className="skz-switch" style={{..._sSwitch, color: color}} onClick={handleSwitch}>
            <div className="skz-switch_circle" style={{..._sCircle, color: color}} onClick={handleSwitch}>

            </div>
        </div>
    );
};

const _sSwitch: CSSProperties = {
    position: 'relative',
    width: 30,
    height: 10,
    borderRadius: '25%',
    cursor: 'pointer',
    backgroundColor: 'grey',
    opacity: .8
}

const _sCircle: CSSProperties = {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'grey'
}

export default Switch;