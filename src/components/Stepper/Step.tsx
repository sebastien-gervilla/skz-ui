import React, { CSSProperties } from 'react';
import { BiCheck } from 'react-icons/bi';

export interface SkzStepProps {
    step: number,
    index: number,
    text?: string,
    color?: string,
    textColor?: string
}

const Step = ({step, index, text, color = '#009BE6', textColor = '#fff'}: SkzStepProps) => {

    const isActive = step === index + 1;
    const isCompleted = step > index + 1;

    return (
        <div className="skz-step_wrapper" style={_sStepWrapper}>
            <div 
                className="skz-step" 
                style={{
                    ..._sStep,
                    opacity: isCompleted || isActive ? 1 : .75,
                    color: isCompleted || isActive ? textColor : '#fff',
                    backgroundColor: isCompleted || isActive ? color : '#666'
                }}
            >
                {isCompleted ? <BiCheck style={_sIcon} /> : index}
            </div>
            <div className="skz-text">
                {text}
            </div>
        </div>
    )
};

//#region Styles

const _sStepWrapper: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: 15,
    fontFamily: 'Helvetica, Arial'
}

const _sStep: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    margin: 15,
    borderRadius: '50%'
}

const _sIcon: CSSProperties = {
    width: '75%',
    height: '75%'
}

//#endregion

export default Step;