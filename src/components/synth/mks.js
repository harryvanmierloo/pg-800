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
    }
}

export default mks;
