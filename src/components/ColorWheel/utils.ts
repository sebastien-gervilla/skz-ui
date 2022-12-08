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

const getCanvasContext = (canvas: HTMLCanvasElement) => canvas.getContext("2d", {willReadFrequently: true});

const getColorArray = (event: SyntheticEvent) => {
    const canvas = <HTMLCanvasElement>event.target;
    const nativeEvent = <MouseEvent>event.nativeEvent;
    const context = getCanvasContext(canvas);
    const x = parseFloat(nativeEvent.offsetX.toString());
    const y = parseFloat(nativeEvent.offsetY.toString());
    return context?.getImageData(x, y, 1, 1).data || [0, 0, 0];
}

const getHexColors = (event: SyntheticEvent) => {
    const colors = getColorArray(event);
    const r = colors[0].toString(16);
    const g = colors[1].toString(16);
    const b = colors[2].toString(16);
    return [
        colors[0] > 16 ? r : '0' + r,
        colors[1] > 16 ? g : '0' + g,
        colors[2] > 16 ? b : '0' + b,
    ];
}

export const handleHoverWheel = (event: SyntheticEvent, isDragging: boolean, onColorChange: (color: string) => void) => {
    if (!isDragging) return;
    const hexArray = getHexColors(event);
    const hex = hexArray.join('');
    hex && onColorChange(hex);
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
        x: (cx + handleDist * Math.cos(handleAngle) * 1) - 2,
        y: (cy + handleDist * Math.sin(handleAngle) * -1) - 2,
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

interface HsvColor {
    h: number,
    s: number,
    v: number
}

const isValidHex = (hex: string) => /([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (hex: string, chunkSize: number) => hex.match(new RegExp(`.{${chunkSize}}`, "g"));

const convertHexUnitTo256 = (hexStr: string) => parseInt(hexStr.repeat(2 / hexStr.length), 16);

export const rgbToHsv = ({ r, g, b }: RgbColor): HsvColor => {
    const max = Math.max(r, g, b);
    const delta = max - Math.min(r, g, b);
  
    const hh = delta
        ? max === r
            ? (g - b) / delta
            : max === g
            ? 2 + (b - r) / delta
            : 4 + (r - g) / delta
        : 0;
  
    return {
        h: 60 * (hh < 0 ? hh + 6 : hh),
        s: max ? (delta / max) * 100 : 0,
        v: (max / 255) * 100
    };
};

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