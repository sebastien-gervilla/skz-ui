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
            const nextStep = isValidElement(child) ?
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

            return (
                <React.Fragment>
                    {index !== 0 && 
                        <div 
                            className="skz-step-divider_wrapper" 
                            style={_sDivider}
                        >
                            <div 
                                className="skz-step-divider"
                                style={{
                                    height: 2,
                                    transition: '.2s ease',
                                    backgroundColor: step >= index + 1 ? color : '#666',
                                }}
                            >
                            </div>
                        </div>
                    }
                    {nextStep}
                </React.Fragment>
            )
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

const _sDivider: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 auto'
}

//#endregion

export default Stepper;