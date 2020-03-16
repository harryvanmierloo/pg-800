const parameters = {
    11: {
        name: "DCO-1 RANGE",
        min: 0,
        max: 127,
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
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Noise" },
            { value: 32, label: "Saw" },
            { value: 64, label: "Pulse" },
            { value: 96, label: "Square" }
        ]
    },
    13: {
        name: "DCO-1 TUNE",
        min: 0,
        max: 127
    },
    14: {
        name: "DCO-1 LFO MOD DEPTH",
        min: 0,
        max: 127
    },
    15: {
        name: "DCO-1 ENV MOD DEPTH",
        min: 0,
        max: 127
    },
    16: {
        name: "DCO-12 RANGE",
        min: 0,
        max: 127,
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
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Noise" },
            { value: 32, label: "Saw" },
            { value: 64, label: "Pulse" },
            { value: 96, label: "Square" }
        ]
    },
    18: {
        name: "DCO-2 CROSS MOD",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "Sync 1" },
            { value: 64, label: "Sync 2" },
            { value: 96, label: "Xmod" }
        ]
    },
    19: {
        name: "DCO-2 TUNE",
        min: 0,
        max: 127
    },
    20: {
        name: "DCO-2 FINE TUNE",
        min: 0,
        max: 127
    },
    21: {
        name: "DCO-2 LFO MOD DEPTH",
        min: 0,
        max: 127
    },
    22: {
        name: "DCO-2 ENV MOD DEPTH",
        min: 0,
        max: 127
    },
    26: {
        name: "DCO DYNAMICS",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    27: {
        name: "DCO ENV MODE",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "ENV-2 Inverted" },
            { value: 32, label: "ENV-2 Normal" },
            { value: 64, label: "ENV-1 Inverted" },
            { value: 96, label: "ENV-1 Normal" }
        ]
    },
    28: {
        name: "MIXER DCO-1",
        min: 0,
        max: 127
    },
    29: {
        name: "MIXER DCO-2",
        min: 0,
        max: 127
    },
    30: {
        name: "MIXER ENV MOD DEPTH",
        min: 0,
        max: 127
    },
    31: {
        name: "MIXER DYNAMICS",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    32: {
        name: "MIXER ENV MODE",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "ENV-2 Inverted" },
            { value: 32, label: "ENV-2 Normal" },
            { value: 64, label: "ENV-1 Inverted" },
            { value: 96, label: "ENV-1 Normal" }
        ]
    },
    33: {
        name: "HPF CUTOFF FREQ",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "0" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    34: {
        name: "VCF CUTOFF FREQ",
        min: 0,
        max: 127
    },
    35: {
        name: "VCF RESONANCE",
        min: 0,
        max: 127
    },
    36: {
        name: "VCF LFO MOD DEPTH",
        min: 0,
        max: 127
    },
    37: {
        name: "VCF ENV MOD DEPTH",
        min: 0,
        max: 127
    },
    38: {
        name: "VCF KEY FOLLOW",
        min: 0,
        max: 127
    },
    39: {
        name: "VCF DYNAMICS",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    40: {
        name: "VCF ENV MODE",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "ENV-2 Inverted" },
            { value: 32, label: "ENV-2 Normal" },
            { value: 64, label: "ENV-1 Inverted" },
            { value: 96, label: "ENV-1 Normal" }
        ]
    },
    41: {
        name: "VCA LEVEL",
        min: 0,
        max: 127
    },
    42: {
        name: "VCA DYNAMICS",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    43: {
        name: "CHORUS",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" }
        ]
    },
    44: {
        name: "LFO WAVEFORM",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Random" },
            { value: 32, label: "Square" },
            { value: 64, label: "Triangle" }
        ]
    },
    45: {
        name: "LFO DELAY TIME",
        min: 0,
        max: 127
    },
    46: {
        name: "LFO RATE",
        min: 0,
        max: 127
    },
    47: {
        name: "ENV-1 ATTACK TIME",
        min: 0,
        max: 127
    },
    48: {
        name: "ENV-1 DECAY TIME",
        min: 0,
        max: 127
    },
    49: {
        name: "ENV-1 SUSTAIN LEVEL",
        min: 0,
        max: 127
    },
    50: {
        name: "ENV-1 RELEASE TIME",
        min: 0,
        max: 127
    },
    51: {
        name: "ENV-1 KEY FOLLOW",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    52: {
        name: "ENV-1 ATTACK TIME",
        min: 0,
        max: 127
    },
    53: {
        name: "ENV-1 DECAY TIME",
        min: 0,
        max: 127
    },
    54: {
        name: "ENV-1 SUSTAIN LEVEL",
        min: 0,
        max: 127
    },
    55: {
        name: "ENV-1 RELEASE TIME",
        min: 0,
        max: 127
    },
    56: {
        name: "ENV-1 KEY FOLLOW",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Off" },
            { value: 32, label: "1" },
            { value: 64, label: "2" },
            { value: 96, label: "3" }
        ]
    },
    58: {
        name: "VCA ENV MODE",
        min: 0,
        max: 127,
        marks: [
            { value: 0, label: "Gate" },
            { value: 64, label: "ENV-2 Normal" }
        ]
    },
}

export default parameters;
