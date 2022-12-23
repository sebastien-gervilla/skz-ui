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

export const isValidHex = (hex: string) => /([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

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
export const hexToRgb = (hex: string) => {
    if (!isValidHex(hex)) return DEFAULT_RGB;
    const chunkSize = Math.floor(hex.length / 3);
    const hexArr = getChunksFromString(hex, chunkSize);

    if (!hexArr) return DEFAULT_RGB;
    const [r, g, b] = hexArr.map(convertHexUnitTo256);
    return { r, g, b };
}

export const hexToHsv = (hex: string) => rgbToHsv(hexToRgb(hex));