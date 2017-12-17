// https://gist.github.com/callumlocke/41b210743990f07c2d96
export const rgbToInt = (rgb) => {
    const { r, g, b } = rgb
    return (r << 16) + (g << 8) + (b)
}

// convert 0..255 R,G,B values to a hexadecimal color string
export const rgbToHex = (rgb) => {
    const { r, g, b } = rgb
    // eslint-disable-next-line no-mixed-operators
    const bin = r << 16 | g << 8 | b
    return ((h) => {
        return new Array(7 - h.length).join('0') + h
    })(bin.toString(16).toUpperCase())
}

// convert a 24 bit binary color to 0..255 R,G,B
export const intToRGB = (bin) => {
    const pbin = parseInt(bin, 2)
    const r = pbin >> 16
    // eslint-disable-next-line no-mixed-operators
    const g = pbin >> 8 & 0xFF
    const b = pbin & 0xFF
    return { r, g, b }
}

// convert a hexidecimal color string to 0..255 R,G,B
export const hexToRGB = (hexString) => {
    const hex = parseInt(hexString.substr(1), 16)
    const r = hex >> 16
    // eslint-disable-next-line no-mixed-operators
    const g = hex >> 8 & 0xFF
    const b = hex & 0xFF
    return { r, g, b }
}