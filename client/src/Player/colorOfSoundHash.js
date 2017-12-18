import {hexToRGB, rgbToInt} from '../helpers/color'

const basicTable = {
    '#520000': {
        sound: {
            frequency: 349.2,
            waveLength: 98.88,
        },
        light: {
            frequency: 384,
            waveLength: 780.8
        },
        names: ['F4'],
        octaveMultiplier: 40,
    },
    '#740000': {
        sound: {
            frequency: 370,
            waveLength: 93.33,
        },
        light: {
            frequency: 406.8,
            waveLength: 736.9
        },
        names: ['F#', 'Gb'],
        octaveMultiplier: 40,
    },
    '#b30000': {
        sound: {
            frequency: 392,
            waveLength: 88.09,
        },
        light: {
            frequency: 431,
            waveLength: 656.5
        },
        names: ['G4'],
        octaveMultiplier: 40,
    },
    '#ee0000': {
        sound: {
            frequency: 415.3,
            waveLength: 83.15,
        },
        light: {
            frequency: 456.6,
            waveLength: 656.5
        },
        names: ['G#', 'Ab'],
        octaveMultiplier: 40,
    },
    '#ff6300': {
        sound: {
            frequency: 440,
            waveLength: 78.48,
        },
        light: {
            frequency: 483.8,
            waveLength: 619.7
        },
        names: ['A4'],
        octaveMultiplier: 40,
    },
    '#ffec00': {
        sound: {
            frequency: 466.2,
            waveLength: 74.07,
        },
        light: {
            frequency: 512.5,
            waveLength: 584.9
        },
        names: ['A#', 'Bb'],
        octaveMultiplier: 40,
    },
    '#99ff00': {
        sound: {
            frequency: 493.9,
            waveLength: 69.92,
        },
        light: {
            frequency: 543,
            waveLength: 552.1
        },
        names: ['B4'],
        octaveMultiplier: 40,
    },
    '#28ff00': {
        sound: {
            frequency: 523.2,
            waveLength: 65.99,
        },
        light: {
            frequency: 575.3,
            waveLength: 521.1
        },
        names: ['C5'],
        octaveMultiplier: 40,
    },
    '#00ffe8': {
        sound: {
            frequency: 554.4,
            waveLength: 62.29,
        },
        light: {
            frequency: 609.5,
            waveLength: 491.8
        },
        names: ['C#','Db'],
        octaveMultiplier: 40,
    },
    '#007cff': {
        sound: {
            frequency: 587.3,
            waveLength: 58.79,
        },
        light: {
            frequency: 645.8,
            waveLength:464.2
        },
        names: ['D5'],
        octaveMultiplier: 40,
    },
    '#0500ff': {
        sound: {
            frequency: 622.2,
            waveLength: 55.49,
        },
        light: {
            frequency: 684.2,
            waveLength: 438.2
        },
        names: ['D#','Eb'],
        octaveMultiplier: 40,
    },
    '#4500ea': {
        sound: {
            frequency: 659.3,
            waveLength: 52.38,
        },
        light: {
            frequency: 724.9,
            waveLength: 413.6
        },
        names: ['E5'],
        octaveMultiplier: 40,
    },
    '#57009e': {
        sound: {
            frequency: 698.5,
            waveLength: 49.44,
        },
        light: {
            frequency: 768,
            waveLength: 390.4
        },
        names: ['F5'],
        octaveMultiplier: 40,
    },
    // '#55004f': {
    //     transition:true,
    //     from: '#520000',
    //     to:'#57009e',
    //     names: ['F4','F5'],
    //     octaveMultiplier: 40,
    // },
}
class HashTable {
    constructor() {
        this.hashByRgbInt = {}
    }
    calculate() {
        Object.keys(basicTable).map((key)=>{
            const value = basicTable[key]
            const rgb = hexToRGB(key)
            const rgbInt = rgbToInt(rgb)
            this.hashByRgbInt[rgbInt] = value
            return rgbInt
        })
    }
}



export default HashTable