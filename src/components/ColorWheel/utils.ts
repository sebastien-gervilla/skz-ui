import { SyntheticEvent } from "react";

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const mod = (a: number, n: number) => ((a % n) + n) % n;

// ===================== //
//       Wheel Utils     //
// ===================== //
  
export const drawColorWheel = (canvas: HTMLCanvasElement, size = 150) => {
    const context = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    if (!context) return;
    const centerColor = 'white';
  
    let angle = 0;
    const hexCode = [0, 0, 255];
    let pivotPointer = 0;
    const colorOffsetByDegree = 4.322;
    const radius = size / 2;
  
    while (angle < 360) {
        const pivotPointerbefore = (pivotPointer + 3 - 1) % 3;
    
        if (hexCode[pivotPointer] < 255) {
            // If main points isn't full, add to main pointer
            hexCode[pivotPointer] = hexCode[pivotPointer] + colorOffsetByDegree > 255 ?
                255 : hexCode[pivotPointer] + colorOffsetByDegree;

        } else if (hexCode[pivotPointerbefore] > 0) {
            // If color before main isn't zero, subtract
            hexCode[pivotPointerbefore] = hexCode[pivotPointerbefore] > colorOffsetByDegree ?
                hexCode[pivotPointerbefore] - colorOffsetByDegree : 0;

        } else if (hexCode[pivotPointer] >= 255) {
            // If main color is full, move pivot
            hexCode[pivotPointer] = 255;
            pivotPointer = (pivotPointer + 1) % 3;
        }
    
        const roundedHex = hexCode.map(h => Math.floor(h));
        const rgb = `rgb(${roundedHex.join(',')})`;
        const gradiant = context.createRadialGradient(
            radius, radius, 0,
            radius, radius, radius
        );

        gradiant.addColorStop(0, centerColor);
        gradiant.addColorStop(1, rgb);
        context.fillStyle = gradiant;
    
        // draw circle portion
        context.globalCompositeOperation = 'source-over';
        context.beginPath();
        context.moveTo(radius, radius);
        context.arc(
            radius,
            radius,
            radius,
            degreesToRadians(angle),
            degreesToRadians(360)
        );
            context.closePath();
            context.fill();
            angle++;
    }
}

const getColorArray = (event: SyntheticEvent) => {
    const canvas = <HTMLCanvasElement>event.target;
    const nativeEvent = <MouseEvent>event.nativeEvent;
    const context = <CanvasRenderingContext2D>canvas.getContext("2d");
    const x = parseFloat(nativeEvent.offsetX.toString());
    const y = parseFloat(nativeEvent.offsetY.toString());
    return context.getImageData(x, y, 1, 1).data;
}

const getColors = (event: SyntheticEvent) => {
    const colors = getColorArray(event);
    return [colors[0], colors[1], colors[2]];
}

export const handleHoverWheel = (event: SyntheticEvent, isDragging: boolean, onColorChange: (color: string) => void) => {
    if (!isDragging) return;
    const rgbArray = getColors(event);
    const hex = rgbArray.map(color => color.toString(16)).join('');
    hex && onColorChange(hex);
    return hex;
}

// ====================== //
//      Pointer Utils     //
// ====================== //

const getWheelDimensions = (width: number) => {
    const r = width / 2;
    return {
        width,
        radius: r,
        cx: r,
        cy: r,
    };
}

export function translateWheelAngle(wheelAngle: number, angle: number) {
    angle = 360 - wheelAngle + angle;
    return mod(angle, 360);
}

export const getWheelHandlePosition = (width: number, hex: string) => {
    const hsv = hexToHsv(hex);
    const { cx, cy } = getWheelDimensions(width);
    const handleRange = width / 2;
    const handleAngle = (180 + translateWheelAngle(width, hsv.h)) * ((Math.PI * 2) / 360);
    const handleDist = (hsv.s / 100) * handleRange;
    return {
        x: cx + handleDist * Math.cos(handleAngle) * -1,
        y: cy + handleDist * Math.sin(handleAngle) * -1,
    };
}

// ====================== //
//      Convert Utils     //
// ====================== //

interface RgbColor {
    r: number,
    g: number,
    b: number
}

const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (hex: string, chunkSize: number) => hex.match(new RegExp(`.{${chunkSize}}`, "g"));

const convertHexUnitTo256 = (hexStr: string) => parseInt(hexStr.repeat(2 / hexStr.length), 16);

const rgbToHsv = ({r, g, b}: RgbColor) => {
    r /= 255, g /= 255, b /= 255;
  
    const max = Math.max(r, g, b), 
    min = Math.min(r, g, b);
    let h = max, 
        s = max;
    const v = max;
  
    const diff = max - min;
    s = (max === 0) ? 0 : diff / max;
  
    if (max === min)
        h = 0;
    else {
        switch (max) {
            case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }
  
        h /= 6;
    }
  
    return { h, s, v };
}

const DEFAULT_RGB = { r: 0, g: 0, b: 0};
const hexToRgb = (hex: string) => {
    if (!isValidHex(hex)) return DEFAULT_RGB;
    const chunkSize = Math.floor(hex.length / 3);
    const hexArr = getChunksFromString(hex, chunkSize);

    if (!hexArr) return DEFAULT_RGB;
    const [r, g, b] = hexArr.map(convertHexUnitTo256);
    return { r, g, b };
}

export const hexToHsv = (hex: string) => rgbToHsv(hexToRgb(hex));