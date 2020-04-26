const mks = {
    parameters: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {
            name: "DCO-1 RANGE",
            label: "RANGE",
            min: 0,
            max: 96,
            defaultValue: 32,
            marks: [
                { value: 0, label: "16" },
                { value: 32, label: "8" },
                { value: 64, label: "4" },
                { value: 96, label: "2" }
            ]
        },
        12: {
            name: "DCO-1 WAVEFORM",
            label: "WAVE",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Noise" },
                { value: 32, label: "Saw" },
                { value: 64, label: "Pulse" },
                { value: 96, label: "Square" }
            ]
        },
        13: {
            name: "DCO-1 TUNE",
            label: "TUNE",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        14: {
            name: "DCO-1 LFO MOD DEPTH",
            label: "LFO",
            min: 0,
            max: 127
        },
        15: {
            name: "DCO-1 ENV MOD DEPTH",
            label: "ENV",
            min: 0,
            max: 127
        },
        16: {
            name: "DCO-2 RANGE",
            label: "RANGE",
            min: 0,
            max: 96,
            defaultValue: 32,
            marks: [
                { value: 0, label: "16" },
                { value: 32, label: "8" },
                { value: 64, label: "4" },
                { value: 96, label: "2" }
            ]
        },
        17: {
            name: "DCO-2 WAVEFORM",
            label: "WAVE",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Noise" },
                { value: 32, label: "Saw" },
                { value: 64, label: "Pulse" },
                { value: 96, label: "Square" }
            ]
        },
        18: {
            name: "DCO-2 CROSS MOD",
            label: "XMOD",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "Sync 1" },
                { value: 64, label: "Sync 2" },
                { value: 96, label: "Xmod" }
            ]
        },
        19: {
            name: "DCO-2 TUNE",
            label: "TUNE",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        20: {
            name: "DCO-2 FINE TUNE",
            label: "FINE",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        21: {
            name: "DCO-2 LFO MOD DEPTH",
            label: "LFO",
            min: 0,
            max: 127
        },
        22: {
            name: "DCO-2 ENV MOD DEPTH",
            label: "ENV",
            min: 0,
            max: 127
        },
        23: {},
        24: {},
        25: {},
        26: {
            name: "DCO DYNAMICS",
            label: "DYNAMICS",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        27: {
            name: "DCO ENV MODE",
            label: "MODE",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "ENV2-" },
                { value: 32, label: "ENV2+" },
                { value: 64, label: "ENV1-" },
                { value: 96, label: "ENV1+" }
            ]
        },
        28: {
            name: "MIXER DCO-1",
            label: "DCO-1",
            min: 0,
            max: 127
        },
        29: {
            name: "MIXER DCO-2",
            label: "DCO-2",
            min: 0,
            max: 127
        },
        30: {
            name: "MIXER ENV MOD DEPTH",
            label: "ENV",
            min: 0,
            max: 127
        },
        31: {
            name: "MIXER DYNAMICS",
            label: "DYNAMICS",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        32: {
            name: "MIXER ENV MODE",
            label: "MODE",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "ENV2-" },
                { value: 32, label: "ENV2+" },
                { value: 64, label: "ENV1-" },
                { value: 96, label: "ENV1+" }
            ]
        },
        33: {
            name: "HPF CUTOFF FREQ",
            label: "HPF",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "0" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        34: {
            id: 34,
            name: "VCF CUTOFF FREQ",
            label: "CUTOFF",
            min: 0,
            max: 127
        },
        35: {
            name: "VCF RESONANCE",
            label: "RES",
            min: 0,
            max: 127
        },
        36: {
            name: "VCF LFO MOD DEPTH",
            label: "LFO",
            min: 0,
            max: 127
        },
        37: {
            name: "VCF ENV MOD DEPTH",
            label: "ENV",
            min: 0,
            max: 127
        },
        38: {
            name: "VCF KEY FOLLOW",
            label: "KYBD",
            min: 0,
            max: 127
        },
        39: {
            name: "VCF DYNAMICS",
            label: "DYNAMICS",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        40: {
            name: "VCF ENV MODE",
            label: "MODE",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "ENV2-" },
                { value: 32, label: "ENV2+" },
                { value: 64, label: "ENV1-" },
                { value: 96, label: "ENV1+" }
            ]
        },
        41: {
            name: "VCA LEVEL",
            label: "LEVEL",
            min: 0,
            max: 127
        },
        42: {
            name: "VCA DYNAMICS",
            label: "DYNAMICS",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        43: {
            name: "CHORUS",
            label: "MODE",
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" }
            ]
        },
        44: {
            name: "LFO WAVEFORM",
            label: "WAVE",
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Random" },
                { value: 32, label: "Square" },
                { value: 64, label: "Triangle" }
            ]
        },
        45: {
            name: "LFO DELAY TIME",
            label: "DELAY",
            min: 0,
            max: 127
        },
        46: {
            name: "LFO RATE",
            label: "RATE",
            min: 0,
            max: 127
        },
        47: {
            name: "ENV-1 ATTACK TIME",
            label: "ATTACK",
            min: 0,
            max: 127
        },
        48: {
            name: "ENV-1 DECAY TIME",
            label: "DECAY",
            min: 0,
            max: 127
        },
        49: {
            name: "ENV-1 SUSTAIN LEVEL",
            label: "SUSTAIN",
            min: 0,
            max: 127
        },
        50: {
            name: "ENV-1 RELEASE TIME",
            label: "RELEASE",
            min: 0,
            max: 127
        },
        51: {
            name: "ENV-1 KEY FOLLOW",
            label: "KYBD",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        52: {
            name: "ENV-2 ATTACK TIME",
            label: "ATTACK",
            min: 0,
            max: 127
        },
        53: {
            name: "ENV-2 DECAY TIME",
            label: "DECAY",
            min: 0,
            max: 127
        },
        54: {
            name: "ENV-2 SUSTAIN LEVEL",
            label: "SUSTAIN",
            min: 0,
            max: 127
        },
        55: {
            name: "ENV-2 RELEASE TIME",
            label: "RELEASE",
            min: 0,
            max: 127
        },
        56: {
            name: "ENV-2 KEY FOLLOW",
            label: "KYBD",
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        57: {

        },
        58: {
            name: "VCA ENV MODE",
            label: "MODE",
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Gate" },
                { value: 64, label: "ENV-2" }
            ]
        },
    },
    patch: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {},
        13: {},
        14: {},
        15: {},
        16: {},
        17: {},
        18: {
            name: "U/L BALANCE",
            label: "U/L",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        19: {
            name: "DUAL DETUNE",
            label: "DUEL DETUNE",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        20: {
            name: "UPPER SPLIT POINT",
            label: "UPPER SPLIT",
            defaultValue: 64,
            min: 21,
            max: 108
        },
        21: {
            name: "LOWER SPLIT POINT",
            label: "LOWER SPLIT",
            defaultValue: 64,
            min: 21,
            max: 108
        },
        22: {
            name: "PORTAMENTO TIME",
            label: "PORTAMENTO",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        23: { // Needs attention
            name: "BEND RANGE",
            label: "RANGE",
            min: 0,
            max: 96,
            defaultValue: 64,
            marks: [
                { value: 0, label: "2" },
                { value: 32, label: "3" },
                { value: 64, label: "4" },
                { value: 96, label: "7" },
                { value: 128, label: "12" }
            ]
        },
        24: { // Needs attention
            name: "KEY MODE",
            label: "KEY MODE",
            min: 0,
            max: 3,
            defaultValue: 0,
            marks: [
                { value: 0, label: "0" },
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" }
            ]
        },
        25: {
            name: "TOTAL VOLUME",
            label: "TOTAL VOLUME",
            defaultValue: 100,
            min: 0,
            max: 127
        },
        26: {
            name: "AFTER TOUCH VIBRATO",
            label: "AFTER TOUCH VIBRATO",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        27: {
            name: "AFTER TOUCH BRILLIANCE",
            label: "AFTER TOUCH BRILLIANCE",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        28: {
            name: "AFTER TOUCH VOLUME",
            label: "AFTER TOUCH VOLUME",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        29: {
            name: "UPPER TONE NUMBER",
            label: "UPPER TONE",
            defaultValue: 0,
            min: 0,
            max: 99
        },
        30: { // Needs attention
            name: "UPPER CHROMATIC SHIFT",
            label: "UPPER CHROMATIC SHIFT",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        31: { 
            name: "UPPER KEY ASSIGN",
            label: "UPPER KEY ASSIGN",
            min: 0,
            max: 6,
            defaultValue: 0,
            marks: [
                { value: 0, label: "Poly-1" },
                { value: 1, label: "Unison-1" },
                { value: 2, label: "Mono-1" },
                { value: 4, label: "Poly-2" },
                { value: 5, label: "Unison-2" },
                { value: 6, label: "Mono-2" }
            ]
        },
        32: {
            name: "UPPER UNISON DETUNE",
            label: "UPPER UNISON DETUNE",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        33: { 
            name: "UPPER HOLD",
            label: "UPPER HOLD",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
        34: {
            name: "UPPER LFO MOD DEPTH",
            label: "UPPER LFO MOD DEPTH",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        35: { 
            name: "UPPER PORTAMENTO",
            label: "UPPER PORTAMENTO",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
        36: { 
            name: "UPPER BENDER",
            label: "UPPER BENDER",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
        37: {},
        38: {
            name: "LOWER TONE NUMBER",
            label: "LOWER TONE",
            defaultValue: 0,
            min: 0,
            max: 99
        },
        39: { // Needs attention
            name: "LOWER CHROMATIC SHIFT",
            label: "LOWER CHROMATIC SHIFT",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        40: { 
            name: "LOWER KEY ASSIGN",
            label: "LOWER KEY ASSIGN",
            min: 0,
            max: 6,
            defaultValue: 0,
            marks: [
                { value: 0, label: "Poly-1" },
                { value: 1, label: "Unison-1" },
                { value: 2, label: "Mono-1" },
                { value: 4, label: "Poly-2" },
                { value: 5, label: "Unison-2" },
                { value: 6, label: "Mono-2" }
            ]
        },
        41: {
            name: "LOWER UNISON DETUNE",
            label: "LOWER UNISON DETUNE",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        42: { 
            name: "LOWER HOLD",
            label: "LOWER HOLD",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
        43: {
            name: "LOWER LFO MOD DEPTH",
            label: "LOWER LFO MOD DEPTH",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        44: { 
            name: "LOWER PORTAMENTO",
            label: "LOWER PORTAMENTO",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
        45: { 
            name: "LOWER BENDER",
            label: "LOWER BENDER",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
        46: {},
        47: {
            name: "CHASE LEVEL",
            label: "CHASE LEVEL",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        48: { 
            name: "CHASE MODE",
            label: "CHASE MODE",
            min: 0,
            max: 2,
            defaultValue: 0,
            marks: [
                { value: 0, label: "A-B" },
                { value: 1, label: "A-B-B-" },
                { value: 2, label: "A-B-A-" }
            ]
        },
        49: {
            name: "CHASE TIME",
            label: "CHASE TIME",
            defaultValue: 1,
            min: 1,
            max: 127
        },
        50: { 
            name: "CHASE PLAY",
            label: "CHASE PLAY",
            min: 0,
            max: 1,
            defaultValue: 0,
            marks: [
                { value: 0, label: "OFF" },
                { value: 1, label: "ON" }
            ]
        },
    }
}

export default mks;
