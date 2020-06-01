const mksVecoven4 = {
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
            sysex: 0x0B,
            defaultValue: 32,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "16" },
                { value: 32, label: "8" },
                { value: 64, label: "4" },
                { value: 96, label: "2" }
            ]
        },
        12: { // Values are different from Roland manual spec (mistake in spec)
            name: "DCO-1 WAVEFORM",
            label: "WAVE",
            sysex: 0x0D,
            defaultValue: 96,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Noise" },
                { value: 32, label: "Square" },
                { value: 64, label: "Pulse" },
                { value: 96, label: "Saw" }
            ]
        },
        13: {
            name: "DCO-1 TUNE",
            label: "TUNE",
            sysex: 0x0D,
            defaultValue: 64,
            min: 0,
            max: 127
        },
        14: {
            name: "DCO-1 LFO MOD DEPTH",
            label: "LFO",
            sysex: 0x0E,
            min: 0,
            max: 127
        },
        15: {
            name: "DCO-1 LFO SOURCE",
            label: "LFO SRC",
            sysex: 0x0F,
            min: 0,
            max: 96,
            defaultValue: 32,
            marks: [
                { value: 0, label: "LFO1-" },
                { value: 32, label: "LFO1+" },
                { value: 64, label: "LFO2-" },
                { value: 96, label: "LFO2+" }
            ]
        },
        16: {
            name: "DCO-1 ENV MOD DEPTH",
            label: "ENV",
            sysex: 0x10,
            min: 0,
            max: 127
        },
        17: {
            name: "DCO-1 DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x11,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        18: {
            name: "DCO-1 ENV SOURCE",
            label: "SOURCE",
            sysex: 0x12,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "ENV1-" },
                { value: 16, label: "ENV1+" },
                { value: 32, label: "ENV2-" },
                { value: 48, label: "ENV2+" },
                { value: 64, label: "ENV3-" },
                { value: 80, label: "ENV3+" },
                { value: 96, label: "ENV4-" },
                { value: 112, label: "ENV4+" }
            ]
        },
        19: {},
        20: {},
        21: { // Values are different from Roland manual spec (mistake in spec)
            name: "DCO-2 RANGE",
            label: "RANGE",
            sysex: 0x13,
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
        22: {
            name: "DCO-2 WAVEFORM",
            label: "WAVE",
            sysex: 0x14,
            defaultValue: 96,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Noise" },
                { value: 32, label: "Square" },
                { value: 64, label: "Pulse" },
                { value: 96, label: "Saw" }
            ]
        },
        23: {
            name: "DCO-2 TUNE",
            label: "TUNE",
            sysex: 0x15,
            defaultValue: 64,
            min: 0,
            max: 127
        },
        24: {
            name: "DCO-2 LFO MOD DEPTH",
            label: "LFO",
            sysex: 0x16,
            min: 0,
            max: 127
        },
        25: {
            name: "DCO-2 LFO SOURCE",
            label: "LFO SRC",
            sysex: 0x17,
            min: 0,
            max: 96,
            defaultValue: 32,
            marks: [
                { value: 0, label: "LFO1-" },
                { value: 32, label: "LFO1+" },
                { value: 64, label: "LFO2-" },
                { value: 96, label: "LFO2+" }
            ]
        },
        26: {
            name: "DCO-2 ENV MOD DEPTH",
            label: "ENV",
            sysex: 0x18,
            min: 0,
            max: 127
        },
        27: {
            name: "DCO-2 DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x19,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        28: {
            name: "DCO-2 ENV SOURCE",
            label: "SOURCE",
            sysex: 0x1A,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "ENV1-" },
                { value: 16, label: "ENV1+" },
                { value: 32, label: "ENV2-" },
                { value: 48, label: "ENV2+" },
                { value: 64, label: "ENV3-" },
                { value: 80, label: "ENV3+" },
                { value: 96, label: "ENV4-" },
                { value: 112, label: "ENV4+" }
            ]
        },
        29: {},
        30: {},
        31: {
            name: "DCO CROSS MOD",
            label: "XMOD",
            sysex: 0x1B,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "Sync 1" },
                { value: 64, label: "Sync 2" },
                { value: 96, label: "Xmod" }
            ]
        },
        32: {
            name: "DCO-2 FINE TUNE",
            label: "FINE",
            sysex: 0x1C,
            defaultValue: 64,
            min: 0,
            max: 127
        },
        33: {
            name: "HPF CUTOFF FREQ",
            label: "HPF",
            sysex: 0x1D,
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
            name: "CHORUS",
            label: "MODE",
            sysex: 0x1E,
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" }
            ]
        },
        35: {},
        36: {},
        37: {},
        38: {},
        39: {},
        40: {},
        41: {
            name: "DCO-1 PWM WIDTH",
            label: "WIDTH",
            sysex: 0x1F,
            defaultValue: 64,
            min: 0,
            max: 127
        },
        42: {
            name: "DCO-1 PWM ENV DEPTH",
            label: "ENV",
            sysex: 0x20,
            defaultValue: 0,
            min: 0,
            max: 127
        },
        43: {
            name: "DCO-1 PWM LFO DEPTH",
            label: "LFO",
            sysex: 0x21,
            defaultValue: 0,
            min: 0,
            max: 127
        },
        44: {
            name: "DCO-1 PWM LFO SOURCE",
            label: "LFO SRC",
            sysex: 0x22,
            min: 0,
            max: 96,
            defaultValue: 32,
            marks: [
                { value: 0, label: "LFO1-" },
                { value: 32, label: "LFO1+" },
                { value: 64, label: "LFO2-" },
                { value: 96, label: "LFO2+" }
            ]
        },
        45: {
            name: "DCO-1 PWM DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x23,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        46: {
            name: "DCO-1 PWM ENV SOURCE",
            label: "SOURCE",
            sysex: 0x24,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "ENV1-" },
                { value: 16, label: "ENV1+" },
                { value: 32, label: "ENV2-" },
                { value: 48, label: "ENV2+" },
                { value: 64, label: "ENV3-" },
                { value: 80, label: "ENV3+" },
                { value: 96, label: "ENV4-" },
                { value: 112, label: "ENV4+" }
            ]
        },
        47: {},
        48: {},
        49: {},
        50: {},
        51: {
            name: "DCO-2 PWM WIDTH",
            label: "WIDTH",
            sysex: 0x25,
            defaultValue: 64,
            min: 0,
            max: 127
        },
        52: {
            name: "DCO-2 PWM ENV DEPTH",
            label: "ENV",
            sysex: 0x26,
            defaultValue: 0,
            min: 0,
            max: 127
        },
        53: {
            name: "DCO-2 PWM LFO DEPTH",
            label: "LFO",
            sysex: 0x27,
            defaultValue: 0,
            min: 0,
            max: 127
        },
        54: {
            name: "DCO-2 PWM LFO SOURCE",
            label: "LFO SRC",
            sysex: 0x28,
            min: 0,
            max: 96,
            defaultValue: 32,
            marks: [
                { value: 0, label: "LFO1-" },
                { value: 32, label: "LFO1+" },
                { value: 64, label: "LFO2-" },
                { value: 96, label: "LFO2+" }
            ]
        },
        55: {
            name: "DCO-2 PWM DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x29,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        56: {
            name: "DCO-2 PWM ENV SOURCE",
            label: "SOURCE",
            sysex: 0x2A,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "ENV1-" },
                { value: 16, label: "ENV1+" },
                { value: 32, label: "ENV2-" },
                { value: 48, label: "ENV2+" },
                { value: 64, label: "ENV3-" },
                { value: 80, label: "ENV3+" },
                { value: 96, label: "ENV4-" },
                { value: 112, label: "ENV4+" }
            ]
        },
        57: {},
        58: {},
        59: {},
        60: {},
        61: {
            name: "MIXER DCO-1",
            label: "DCO-1",
            sysex: 0x2B,
            defaultValue: 100,
            min: 0,
            max: 127
        },
        62: {
            name: "MIXER DCO-2",
            label: "DCO-2",
            sysex: 0x2C,
            defaultValue: 100,
            min: 0,
            max: 127
        },
        63: {
            name: "MIXER ENV MOD DEPTH",
            label: "ENV",
            sysex: 0x2D,
            min: 0,
            max: 127
        },
        64: {
            name: "MIXER DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x2E,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        65: {
            name: "MIXER ENV MODE",
            label: "SRC",
            sysex: 0x2F,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "ENV1-" },
                { value: 16, label: "ENV1+" },
                { value: 32, label: "ENV2-" },
                { value: 48, label: "ENV2+" },
                { value: 64, label: "ENV3-" },
                { value: 80, label: "ENV3+" },
                { value: 96, label: "ENV4-" },
                { value: 112, label: "ENV4+" }
            ]
        },
        66: {},
        67: {},
        68: {},
        69: {},
        70: {},
        71: {
            id: 34,
            name: "VCF CUTOFF FREQ",
            label: "CUTOFF",
            sysex: 0x30,
            defaultValue: 127,
            min: 0,
            max: 127
        },
        72: {
            name: "VCF RESONANCE",
            label: "RES",
            sysex: 0x31,
            min: 0,
            max: 127
        },
        73: {
            name: "VCF LFO-1 MOD DEPTH",
            label: "LFO-1",
            sysex: 0x32,
            min: 0,
            max: 127
        },
        74: {
            name: "VCF LFO-2 MOD DEPTH",
            label: "LFO-2",
            sysex: 0x33,
            min: 0,
            max: 127
        },
        75: {
            name: "VCF ENV MOD DEPTH",
            label: "ENV",
            sysex: 0x34,
            min: 0,
            max: 127
        },
        76: {
            name: "VCF KEY FOLLOW",
            label: "KYBD",
            sysex: 0x35,
            min: 0,
            max: 127
        },
        77: {
            name: "VCF DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x36,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        78: {
            name: "VCF ENV MODE",
            label: "MODE",
            sysex: 0x37,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "ENV1-" },
                { value: 16, label: "ENV1+" },
                { value: 32, label: "ENV2-" },
                { value: 48, label: "ENV2+" },
                { value: 64, label: "ENV3-" },
                { value: 80, label: "ENV3+" },
                { value: 96, label: "ENV4-" },
                { value: 112, label: "ENV4+" }
            ]
        },
        79: {},
        80: {},
        81: {
            name: "VCA LEVEL",
            label: "LEVEL",
            sysex: 0x38,
            defaultValue: 100,
            min: 0,
            max: 127
        },
        82: {
            name: "VCA ENV SOURCE",
            label: "SRC",
            sysex: 0x39,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "ENV1" },
                { value: 32, label: "ENV2" },
                { value: 64, label: "ENV3" },
                { value: 96, label: "ENV4" }
            ]
        },
        83: {
            name: "VCA DYNAMICS",
            label: "DYNAMICS",
            sysex: 0x3A,
            min: 0,
            max: 96,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "1" },
                { value: 64, label: "2" },
                { value: 96, label: "3" }
            ]
        },
        84: {},
        85: {},
        86: {},
        87: {},
        88: {},
        89: {},
        90: {},
        91: {
            name: "LFO-1 WAVEFORM",
            label: "WAVE",
            sysex: 0x3B,
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Random" },
                { value: 16, label: "Square" },
                { value: 32, label: "Saw-" },
                { value: 48, label: "Saw+" },
                { value: 64, label: "Sine" }
            ]
        },
        92: {
            name: "LFO-1 DELAY TIME",
            label: "DELAY",
            sysex: 0x3C,
            min: 0,
            max: 127
        },
        93: {
            name: "LFO-1 RATE",
            label: "RATE",
            sysex: 0x3D,
            min: 0,
            max: 127
        },
        94: {
            name: "LFO-1 LFO-2 DEPTH",
            label: "LFO-2",
            sysex: 0x3E,
            min: 0,
            max: 127
        },
        95: {
            name: "LFO-1 SYNC",
            label: "SYNC",
            sysex: 0x3F,
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "On" },
                { value: 64, label: "Key" }
            ]
        },
        96: {},
        97: {},
        98: {},
        99: {},
        100: {},
        101: {
            name: "LFO-2 WAVEFORM",
            label: "WAVE",
            sysex: 0x40,
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Random" },
                { value: 16, label: "Square" },
                { value: 32, label: "Saw-" },
                { value: 48, label: "Saw+" },
                { value: 64, label: "Sine" }
            ]
        },
        102: {
            name: "LFO-2 DELAY TIME",
            label: "DELAY",
            sysex: 0x41,
            min: 0,
            max: 127
        },
        103: {
            name: "LFO-2 RATE",
            label: "RATE",
            sysex: 0x42,
            min: 0,
            max: 127
        },
        104: {
            name: "LFO-2 LFO-1 DEPTH",
            label: "LFO-1",
            sysex: 0x43,
            min: 0,
            max: 127
        },
        105: {
            name: "LFO-2 SYNC",
            label: "SYNC",
            sysex: 0x44,
            min: 0,
            max: 64,
            marks: [
                { value: 0, label: "Off" },
                { value: 32, label: "On" },
                { value: 64, label: "Key" }
            ]
        },
        106: {},
        107: {},
        108: {},
        109: {},
        110: {},
        111: {
            name: "ENV-1 TIME 1",
            label: "T1",
            sysex: 0x45,
            min: 0,
            max: 127
        },
        112: {
            name: "ENV-1 LEVEL 1",
            label: "L1",
            sysex: 0x46,
            min: 0,
            max: 127
        },
        113: {
            name: "ENV-1 TIME 2",
            label: "T2",
            sysex: 0x47,
            min: 0,
            max: 127
        },
        114: {
            name: "ENV-1 LEVEL 2",
            label: "L2",
            sysex: 0x48,
            min: 0,
            max: 127
        },
        115: {
            name: "ENV-1 TIME 3",
            label: "T3",
            sysex: 0x49,
            min: 0,
            max: 127
        },
        116: {
            name: "ENV-1 LEVEL 3",
            label: "L3",
            sysex: 0x4A,
            min: 0,
            max: 127
        },
        117: {
            name: "ENV-1 TIME 4",
            label: "T4",
            sysex: 0x4B,
            min: 0,
            max: 127
        },
        118: {
            name: "ENV-1 KEY FOLLOW",
            label: "KYBD",
            sysex: 0x4C,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "Off" },
                { value: 16, label: "Key 1" },
                { value: 32, label: "Key 2" },
                { value: 48, label: "Key 3" },
                { value: 64, label: "Loop 0" },
                { value: 80, label: "Loop 1" },
                { value: 96, label: "Loop 2" },
                { value: 112, label: "Loop 3" }
            ]
        },
        119: {},
        120: {},
        121: {
            name: "ENV-2 TIME 1",
            label: "T1",
            sysex: 0x4D,
            min: 0,
            max: 127
        },
        122: {
            name: "ENV-2 LEVEL 1",
            label: "L1",
            sysex: 0x4E,
            min: 0,
            max: 127
        },
        123: {
            name: "ENV-2 TIME 2",
            label: "T2",
            sysex: 0x4F,
            min: 0,
            max: 127
        },
        124: {
            name: "ENV-2 LEVEL 2",
            label: "L2",
            sysex: 0x50,
            min: 0,
            max: 127
        },
        125: {
            name: "ENV-2 TIME 3",
            label: "T3",
            sysex: 0x51,
            min: 0,
            max: 127
        },
        126: {
            name: "ENV-2 LEVEL 3",
            label: "L3",
            sysex: 0x52,
            min: 0,
            max: 127
        },
        127: {
            name: "ENV-2 TIME 4",
            label: "T4",
            sysex: 0x53,
            min: 0,
            max: 127
        },
        128: {
            name: "ENV-2 KEY FOLLOW",
            label: "KYBD",
            sysex: 0x54,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "Off" },
                { value: 16, label: "Key 1" },
                { value: 32, label: "Key 2" },
                { value: 48, label: "Key 3" },
                { value: 64, label: "Loop 0" },
                { value: 80, label: "Loop 1" },
                { value: 96, label: "Loop 2" },
                { value: 112, label: "Loop 3" }
            ]
        },
        129: {},
        130: {},
        131: {
            name: "ENV-3 ATTACK TIME",
            label: "ATTACK",
            sysex: 0x55,
            min: 0,
            max: 127
        },
        132: {
            name: "ENV-3 DECAY TIME",
            label: "DECAY",
            sysex: 0x56,
            min: 0,
            max: 127
        },
        133: {
            name: "ENV-3 SUSTAIN LEVEL",
            label: "SUSTAIN",
            sysex: 0x57,
            min: 0,
            max: 127
        },
        134: {
            name: "ENV-3 RELEASE TIME",
            label: "RELEASE",
            sysex: 0x58,
            min: 0,
            max: 127
        },
        135: {
            name: "ENV-3 KEY FOLLOW",
            label: "KYBD",
            sysex: 0x59,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "Off" },
                { value: 16, label: "Key 1" },
                { value: 32, label: "Key 2" },
                { value: 48, label: "Key 3" },
                { value: 64, label: "Loop 0" },
                { value: 80, label: "Loop 1" },
                { value: 96, label: "Loop 2" },
                { value: 112, label: "Loop 3" }
            ]
        },
        136: {},
        137: {},
        138: {},
        139: {},
        140: {},
        141: {
            name: "ENV-3 ATTACK TIME",
            label: "ATTACK",
            sysex: 0x5A,
            min: 0,
            max: 127
        },
        142: {
            name: "ENV-3 DECAY TIME",
            label: "DECAY",
            sysex: 0x5B,
            min: 0,
            max: 127
        },
        143: {
            name: "ENV-3 SUSTAIN LEVEL",
            label: "SUSTAIN",
            sysex: 0x5C,
            min: 0,
            max: 127
        },
        144: {
            name: "ENV-3 RELEASE TIME",
            label: "RELEASE",
            sysex: 0x5D,
            min: 0,
            max: 127
        },
        145: {
            name: "ENV-3 KEY FOLLOW",
            label: "KYBD",
            sysex: 0x5E,
            min: 0,
            max: 112,
            marks: [
                { value: 0, label: "Off" },
                { value: 16, label: "Key 1" },
                { value: 32, label: "Key 2" },
                { value: 48, label: "Key 3" },
                { value: 64, label: "Loop 0" },
                { value: 80, label: "Loop 1" },
                { value: 96, label: "Loop 2" },
                { value: 112, label: "Loop 3" }
            ]
        }
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
            name: "A/B BALANCE",
            label: "A/B",
            defaultValue: 64,
            inverted: true,
            min: 0,
            max: 127
        },
        19: {
            name: "DUAL DETUNE",
            label: "DETUNE",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        20: {
            name: "UPPER SPLIT POINT",
            label: "A-SPLIT",
            defaultValue: 64,
            min: 21,
            max: 108
        },
        21: {
            name: "LOWER SPLIT POINT",
            label: "B-SPLIT",
            defaultValue: 64,
            min: 21,
            max: 108
        },
        22: {
            name: "PORTAMENTO TIME",
            label: "PORTA",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        23: { // Needs attention
            name: "BEND RANGE",
            label: "BEND",
            min: 0,
            max: 96,
            defaultValue: 64,
            marks: [
                { value: 0, label: "2" },
                { value: 32, label: "3" },
                { value: 64, label: "4" },
                { value: 96, label: "7" }
            ]
        },
        24: { // Needs attention
            name: "KEY MODE",
            label: "MODE",
            min: 0,
            max: 3,
            defaultValue: 0,
            marks: [
                { value: 0, label: "Dual" },
                { value: 1, label: "Split" },
                { value: 2, label: "Whole A" },
                { value: 3, label: "Whole B" }
            ]
        },
        25: {
            name: "TOTAL VOLUME",
            label: "VOLUME",
            defaultValue: 100,
            min: 0,
            max: 127
        },
        26: {
            name: "AFTER TOUCH VIBRATO",
            label: "VIBRATO",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        27: {
            name: "AFTER TOUCH BRILLIANCE",
            label: "BRIL",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        28: {
            name: "AFTER TOUCH VOLUME",
            label: "VOLUME",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        29: {
            name: "UPPER TONE NUMBER",
            label: "TONE",
            defaultValue: 0,
            min: 0,
            max: 99
        },
        30: { // Needs attention
            name: "UPPER CHROMATIC SHIFT",
            label: "SHIFT",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        31: { 
            name: "UPPER KEY ASSIGN",
            label: "KEY",
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
            label: "UNISON",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        33: { 
            name: "UPPER HOLD",
            label: "HOLD",
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
            label: "LFO",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        35: { 
            name: "UPPER PORTAMENTO",
            label: "PORTA",
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
            label: "BENDER",
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
            label: "TONE",
            defaultValue: 0,
            min: 0,
            max: 99
        },
        39: { // Needs attention
            name: "LOWER CHROMATIC SHIFT",
            label: "SHIFT",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        40: { 
            name: "LOWER KEY ASSIGN",
            label: "KEY",
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
            label: "UNISON",
            defaultValue: 64,
            min: 0,
            max: 127
        },
        42: { 
            name: "LOWER HOLD",
            label: "HOLD",
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
            label: "LFO",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        44: { 
            name: "LOWER PORTAMENTO",
            label: "PORTA",
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
            label: "BENDER",
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
            label: "LEVEL",
            defaultValue: 0,
            min: 0,
            max: 127
        },
        48: { 
            name: "CHASE MODE",
            label: "MODE",
            min: 0,
            max: 2,
            defaultValue: 0,
            marks: [
                { value: 0, label: "A-B" },
                { value: 1, label: "A-B-B" },
                { value: 2, label: "A-B-A" }
            ]
        },
        49: {
            name: "CHASE TIME",
            label: "TIME",
            defaultValue: 1,
            min: 1,
            max: 127
        },
        50: { 
            name: "CHASE PLAY",
            label: "PLAY",
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

export default mksVecoven4;