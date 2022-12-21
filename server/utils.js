const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils")
const secp = require("ethereum-cryptography/secp256k1")

/**
 * @param  {...any} fns initial value and functions to pipe 
 * @returns {any} result of last transformation
 */
const pipe = (...fns) => { const initial = fns.splice(0, 1)[0]; return fns.reduce((last, pipeStep) => pipeStep(last), initial) }

/**
 * @param {string} publicKey ECDSA public key 
 * @returns {string} Ethereum address as hex string
 */
function getEthAddress(publicKey) {
    return pipe(
        publicKey,
        hexToBytes,
        b => b.slice(1),
        keccak256,
        h => h.slice(-20),
        toHex
    )
}

/**
 * @param {string} message any text
 * @returns {Uint8Array} keccak256 hash of message
 */
function hashMessage(message) {
    return pipe(
        message,
        utf8ToBytes,
        keccak256
    )
}

/**
 * @param {string} hash hex hash of a message
 * @param {Uint8Array} signature ECDSA signature
 * @param {number} recoveryBit recovery bit
 * @returns {Promise<Uint8Array>} ECDSA public key
 */
function recoverKey(hash, signature, recoveryBit) {
    return secp.recoverPublicKey(hash, signature, recoveryBit)
}

/**
 * @param {string} msg any text
 * @param {string} privateKey hex ECDSA private key
 * @returns {Promise<[Uint8Array, number]>} signature and recovery bit
 */
async function signMessage(msg, privateKey) {
    return pipe(
        msg,
        hashMessage,
        async m => await secp.sign(m, privateKey, { recovered: true })
    )
}

/**
 * @returns {string} random private key as hex string
 */
function randomPrivateKey() {
    return pipe(
        secp.utils.randomPrivateKey(),
        toHex
    )
}

/**
 * @param {string} privateKey as hex string
 * @returns {string} public key as hex string
 */
function getPublicKey(privateKey) {
    return pipe(
        privateKey,
        hexToBytes,
        secp.getPublicKey,
        toHex
    )
}

/**
 * 
 * @param {Uint8Array} signature 
 * @param {string} messageHash as hex string
 * @param {Uint8Array} publicKey ECDSA public key
 * @returns {boolean} is valid signature
 */
function isSigned(signature, messageHash, publicKey) {
    return secp.verify(signature, messageHash, publicKey);
}

/**
 * @param {string} address hex string
 * @returns {boolean} is valid address
 */
function isAddressValid(address) {
    return /^[0-9a-fA-F]*$/.test(address);
}

module.exports = {
    pipe,
    getEthAddress,
    hashMessage,
    recoverKey,
    signMessage,
    randomPrivateKey,
    getPublicKey,
    toBytes: hexToBytes,
    toHex,
    isSigned,
    isAddressValid,
}
