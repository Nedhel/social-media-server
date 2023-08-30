function getRandomInt() {
    return Math.floor(Math.random() * (36 - 0 + 1)) + 0;
}

const values = {
    0: { number: 0, color: "green", is: "even", degrees: 0 },
    1: { number: 1, color: "red", is: "odd", degrees: 135 },
    2: { number: 2, color: "black", is: "even", degrees: 300 },
    3: { number: 3, color: "red", is: "odd", degrees: 20 },
    4: { number: 4, color: "black", is: "even", degrees: 320 },
    5: { number: 5, color: "red", is: "odd", degrees: 175 },
    6: { number: 6, color: "black", is: "even", degrees: 263 },
    7: { number: 7, color: "red", is: "odd", degrees: 58 },
    8: { number: 8, color: "black", is: "even", degrees: 205 },
    9: { number: 9, color: "red", is: "odd", degrees: 96 },
    10: { number: 10, color: "black", is: "even", degrees: 185 },
    11: { number: 11, color: "black", is: "odd", degrees: 225 },
    12: { number: 12, color: "red", is: "even", degrees: 40 },
    13: { number: 13, color: "black", is: "odd", degrees: 242 },
    14: { number: 14, color: "red", is: "even", degrees: 115 },
    15: { number: 15, color: "black", is: "odd", degrees: 340 },
    16: { number: 16, color: "red", is: "even", degrees: 155 },
    17: { number: 17, color: "black", is: "odd", degrees: 280 },
    18: { number: 18, color: "red", is: "even", degrees: 80 },
    19: { number: 19, color: "red", is: "odd", degrees: 330 },
    20: { number: 20, color: "black", is: "even", degrees: 125 },
    21: { number: 21, color: "red", is: "odd", degrees: 310 },
    22: { number: 22, color: "black", is: "even", degrees: 95 },
    23: { number: 23, color: "red", is: "odd", degrees: 195 },
    24: { number: 24, color: "black", is: "even", degrees: 165 },
    25: { number: 25, color: "red", is: "odd", degrees: 290 },
    26: { number: 26, color: "black", is: "even", degrees: 10 },
    27: { number: 27, color: "red", is: "odd", degrees: 252 },
    28: { number: 28, color: "black", is: "even", degrees: 50 },
    29: { number: 29, color: "black", is: "odd", degrees: 68 },
    30: { number: 30, color: "red", is: "even", degrees: 215 },
    31: { number: 31, color: "black", is: "odd", degrees: 108 },
    32: { number: 32, color: "red", is: "even", degrees: 350 },
    33: { number: 33, color: "black", is: "odd", degrees: 145 },
    34: { number: 34, color: "red", is: "even", degrees: 270 },
    35: { number: 35, color: "black", is: "odd", degrees: 30 },
    36: { number: 36, color: "red", is: "even", degrees: 235 },
};
function spingRoulete(number) {
    return values[number];
}

module.exports = {
    getRandomInt,
    spingRoulete,
};
