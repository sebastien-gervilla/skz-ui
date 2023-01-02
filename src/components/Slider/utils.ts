export const getRelativeValue = (relativePos: number, size: number, minValue: number, maxValue: number) => {
    return Math.round((relativePos * (maxValue - minValue)) / size) + minValue;
}

export const getRelativePosition = (mousePos: number, sliderLeft: number, size: number) =>
    trimPosition(mousePos - sliderLeft, size)

const trimPosition = (position: number, size: number) =>
    position > size ? size : position < 0 ? 0 : position;