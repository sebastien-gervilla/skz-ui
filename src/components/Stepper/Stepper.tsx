import React, { cloneElement, CSSProperties, isValidElement, ReactNode } from 'react';
import Step from './Step';

export interface SkzStepperProps {
    step: number,
    children: ReactNode | ReactNode[],
    color?: string,
    textColor?: string
}

const Stepper = ({step, children, color = '#009BE6', textColor = '#fff'}: SkzStepperProps) => {

    const steps = React.Children.toArray(children);

    const displaySteps = () => steps.length &&
        steps.map((child, index) => {
            return isValidElement(child) ?
                cloneElement(child, {
                    step,
                    index,
                    color,
                    textColor,
                    ...child.props
                }) : <Step
                    step={step}
                    index={index}
                    text={child.toString()}
                    color={color}
                    textColor={textColor}
                />
        })

    return (
        <div className="skz-stepper_wrapper" style={_sStepper}>
            {displaySteps()}
        </div>
    )
};

//#region Styles

const _sStepper: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between'
}

//#endregion

export default Stepper;