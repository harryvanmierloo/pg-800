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
    34: {
        name: "VCF CUTOFF FREQ",
        min: 0,
        max: 127
    },
    35: {
        name: "VCF RESONANCE",
        min: 0,
        max: 127
    }
}

export default parameters;
