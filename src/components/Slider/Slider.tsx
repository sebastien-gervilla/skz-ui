import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import { getRelativePosition, getRelativeValue } from './utils';

export interface SkzSliderProps {
    value: number,
    min: number,
    max: number,
    onChange: (nextValue: number) => void,
    color?: string,
    offColor?: string,
    size?: number,
    wrapperStyles?: CSSProperties,
    hideTooltip?: boolean,
    vertical?: boolean,
    disabled?: boolean
}

const Slider = ({
        value, 
        min, 
        max, 
        onChange, 
        color = '#009BE6', 
        offColor = '#bbb', 
        size = 180,
        wrapperStyles = {},
        hideTooltip = false,
        vertical = false,
        disabled = false
    }: SkzSliderProps) => {

    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const getPosition = () => {
        const newValue = value > max ? max : value < min ? min : value;
        return size * (newValue - min) / (max - min);
    };

    const position = useMemo<number>(getPosition, [value]);

    const startDragging = () => {
        if (isDragging || disabled) return;
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', handleChangeValue);
        setIsDragging(true);
    }

    const stopDragging = () => {
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('mousemove', handleChangeValue);
        setIsDragging(false);
    }

    const handleSliderClick = (event: React.MouseEvent) =>
        handleChangeValue(event.nativeEvent);

    const handleChangeValue = (event: globalThis.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const slider = sliderRef.current;
        if (!slider) return;
        
        const sliderRect = slider.getBoundingClientRect();
        
        const pos = vertical ?
            getRelativePosition(event.clientY, sliderRect.top, size) :
            getRelativePosition(event.clientX, sliderRect.left, size);
        const newValue = getRelativeValue(pos, size, min, max);
        onChange(newValue);
    }

    return (
        <div 
            className="skz-slider_wrapper" 
            style={{
                ..._sSliderWrapper,
                width: vertical ? 18 : 'unset',
                height: vertical ? 'unset' : 18,
                ...wrapperStyles
            }}
        >
            <div 
                className="skz-slider"
                ref={sliderRef}
                style={{
                    ..._sSlider,
                    backgroundColor: disabled ? offColor : color,
                    opacity: .4,
                    width: vertical ? 4 : size,
                    height: vertical ? size : 4,
                    borderRadius: size / 2.5
                }}
                onClick={handleSliderClick}
            >
            </div>
            <div 
                className="skz-slider_thumb" 
                onMouseDown={startDragging}
                style={{
                    ..._sThumb,
                    width: 14,
                    height: 14,
                    left: vertical ? '50%' : position,
                    top: vertical ? position : '50%',
                    border: '2px solid ' + (disabled ? offColor : color),
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                {(isDragging && !hideTooltip) && 
                    <div 
                        className="skz-slider_tooltip" 
                        style={{
                            ..._sTooltip,
                            ... (vertical ? 
                                    tooltipPosition.vertical : 
                                    tooltipPosition.horizontal)
                        }}
                    >
                        {value}
                        <div 
                            className="skz-slider_tootip-triangle" 
                            style={{
                                ..._sTriangle,
                                top: vertical ? '50%' : '100%',
                                left: vertical ? '100%' : '50%',
                            }}
                        >

                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

const tooltipPosition = {
    vertical: {
        right: '100%',
        top: '50%'
    },
    horizontal: {
        left: '50%',
        bottom: '100%',
    }
}

//#region Styles

const _sSliderWrapper: CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 18
}

const _sSlider: CSSProperties = {
    backgroundColor: '#aaa',
    cursor: 'pointer'
}

const _sThumb: CSSProperties = {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#fff',
    transform: 'translate(-50%, -50%)'
}

const _sTooltip: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 5,
    minWidth: 20,
    minHeight: 20,
    color: '#fff',
    backgroundColor: '#343434',
    fontSize: 14,
    transform: 'translate(-50%, -50%)',
    boxShadow: "rgba(70, 70, 70, 0.3) 2px 2px 15px 0px"
}

const _sTriangle: CSSProperties = {
    position: 'absolute',
    zIndex: -1,
    width: 10,
    height: 10,
    backgroundColor: '#343434',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    transition: '.2se ease'
}

//#endregion

export default Slider;