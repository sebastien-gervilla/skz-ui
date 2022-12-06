import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { drawColorWheel, getWheelHandlePosition, handleHoverWheel } from './utils.js';

export interface SkzColorWheelProps {
    size: number,
    color: string,
    onColorChange: (color: string) => void
}

const ColorWheel = ({size = 150, color, onColorChange}: SkzColorWheelProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const pointerPos = getWheelHandlePosition(size, color);

    useEffect(() => {
        if (!canvasRef.current) return;
        drawColorWheel(canvasRef.current, size);
    }, [canvasRef.current]);

    return (
        <div className="skz-color-wheel_wrapper" style={_sWheelWrapper}>
            <canvas 
                id='skz-color-wheel'
                className='skz-color-wheel'
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={event => handleHoverWheel(event, isDragging, onColorChange)}
                ref={canvasRef}
                style={_sWheel}
            >
            </canvas>
            <div 
                className="pointer" 
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
    borderRadius: '50%'
}

const _sPointer: CSSProperties = {
    position: 'relative',
    border: '50px solid #f00',
    borderRadius: '50%'
}

//#endregion

export default ColorWheel;