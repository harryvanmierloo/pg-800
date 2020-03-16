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
        max: 127
    },
    13: {
        name: "DCO-1 TUNE",
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
