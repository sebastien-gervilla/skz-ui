import React, { CSSProperties, SyntheticEvent, useEffect, useRef } from 'react';
import { drawColorWheel, getWheelHandlePosition, handleHoverWheel } from './utils.js';

export interface SkzColorWheelProps {
    size: number,
    color: string,
    onColorChange: (color: string) => void
}

const ColorWheel = ({size = 150, color, onColorChange}: SkzColorWheelProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draggingRef = useRef<boolean>(false);
    const pointerPos = getWheelHandlePosition(size, color);

    const startDragging = (event: SyntheticEvent) => {
        if (draggingRef.current) return;
        draggingRef.current = true;
        handleHoverWheel(event, true, onColorChange);
    }

    const stopDragging = () => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        drawColorWheel(canvasRef.current, size);
    }, [canvasRef, size]);

    return (
        <div className="skz-color-wheel_wrapper" style={_sWheelWrapper}>
            <canvas 
                className='skz-color-wheel'
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseMove={event => handleHoverWheel(event, draggingRef.current, onColorChange)}
                ref={canvasRef}
                style={_sWheel}
            >
            </canvas>
            <div 
                className="pointer" 
                onMouseUp={stopDragging}
                style={{
                    ..._sPointer, 
                    borderColor: color,
                    top: pointerPos.x,
                    left: pointerPos.y
                }} 
            >
            </div>
        </div>
    )
};

//#region Styles

const _sWheelWrapper: CSSProperties = {
    position: 'relative'
}

const _sWheel: CSSProperties = {
    borderRadius: '50%',
    cursor: 'pointer'
}

const _sPointer: CSSProperties = {
    position: 'absolute',
    content: '',
    width: 5,
    height: 5,
    border: '1px solid white',
    borderRadius: '50%',
    pointerEvents: 'none',
    cursor: 'pointer'
}

//#endregion

export default ColorWheel;