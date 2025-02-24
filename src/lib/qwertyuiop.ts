// 🔹 S-Box (Same as C++)
const sbox = [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0
];

// 🔹 Galois Field Multiplication (Same as C++)
function gmul(a, b) {
    let p = 0;
    for (let i = 0; i < 8 && a; i++) {
        if (a & 1) p ^= b;
        let hiBitSet = b & 0x80;
        b = (b << 1) & 0xFF;
        if (hiBitSet) b ^= 0x1b;
        a >>= 1;
    }
    return p;
}

// 🔹 ShiftBits (Same as C++)
function ShiftBits(byteinput, keybyte, shift, inv = false) {
    if (!inv) {
        return (keybyte % 2 === 0)
            ? ((byteinput << shift) | (byteinput >> (8 - shift))) & 0xFF
            : ((byteinput >> shift) | (byteinput << (8 - shift))) & 0xFF;
    } else {
        return (keybyte % 2 === 0)
            ? ((byteinput >> shift) | (byteinput << (8 - shift))) & 0xFF
            : ((byteinput << shift) | (byteinput >> (8 - shift))) & 0xFF;
    }
}

// 🔹 SubBytes (Same as C++)
function SubBytes(byte) {
    return sbox[byte];
}

// 🔹 MixColumns (Same as C++)
function MixColumns(state, mixConstants, key, inv = false) {
    let temp = Array(4).fill().map(() => Array(4).fill(0x00));

    for (let c = 0; c < 4; c++) {
        for (let i = 0; i < 4; i++) {
            temp[i][c] =
                gmul(state[0][c], mixConstants[i][0]) ^
                gmul(state[1][c], mixConstants[i][1]) ^
                gmul(state[2][c], mixConstants[i][2]) ^
                gmul(state[3][c], mixConstants[i][3]);
        }
    }

    return temp;
}

// 🔹 Key Expansion (Same as C++)
function KeyExpansion(matrixKey) {
    [matrixKey[0][3], matrixKey[1][3], matrixKey[2][3], matrixKey[3][3]] =
        [matrixKey[1][3], matrixKey[2][3], matrixKey[3][3], matrixKey[0][3]];

    for (let i = 0; i < 4; i++) {
        matrixKey[i][0] ^= SubBytes(matrixKey[i][3]);
    }

    for (let j = 1; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            matrixKey[i][j] = matrixKey[i][j - 1] ^ SubBytes(matrixKey[i][j - 1]);
        }
    }

    return matrixKey;
}

// 🔹 SwapBytes (Same as C++)
function SwapBytes(state, key, inv = false) {
    if (!inv) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let firstIndex = (key[i][j] & 0xF0) >> 4;
                let secondIndex = key[i][j] & 0x0F;
                [state[firstIndex >> 2][firstIndex & 3], state[secondIndex >> 2][secondIndex & 3]] =
                    [state[secondIndex >> 2][secondIndex & 3], state[firstIndex >> 2][firstIndex & 3]];
            }
        }
    }
    return state;
}

// 🔹 Encrypt Function
export function encrypt(text, key) {
    let matrixKey = Array.from({ length: 6 }, () => Array.from({ length: 4 }, () => Array(4).fill(0x00)));

    for (let i = 0, k = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++, k += 2) {
            matrixKey[0][i][j] = parseInt(key.substr(k, 2), 16);
        }
    }

    for (let round = 1; round < 6; round++) {
        matrixKey[round] = KeyExpansion(matrixKey[round - 1]);
    }

    let ciphertext = "";

    for (let i = 0; i < text.length; i += 16) {
        let matrix = Array.from({ length: 4 }, () => Array(4).fill(0x00));

        for (let j = 0, u = i; j < 4; j++) {
            for (let k = 0; k < 4; k++, u++) {
                if (u < text.length) matrix[k][j] = text.charCodeAt(u);
            }
        }

        for (let round = 0; round < 5; round++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    matrix[k][j] = ShiftBits(matrix[k][j], matrixKey[round][k][j], (k * 4 + j) % 8);
                    matrix[k][j] = SubBytes(matrix[k][j]);
                }
            }

            matrix = MixColumns(matrix, [
                [0x02, 0x03, 0x01, 0x01],
                [0x01, 0x02, 0x03, 0x01],
                [0x01, 0x01, 0x02, 0x03],
                [0x03, 0x01, 0x01, 0x02]
            ], matrixKey[round]);

            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    matrix[k][j] ^= matrixKey[round][k][j];
                }
            }

            matrix = SwapBytes(matrix, matrixKey[round]);
        }

        ciphertext += matrix.flat().map(x => x.toString(16).padStart(2, "0")).join("");
    }

    return ciphertext;
}

// 🛠 Example Usage
console.log(encrypt("qwertyuiop", "a1f4c5b3d9e0872fb4c1a2d3e5f60789"));
