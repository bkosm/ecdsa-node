import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import secp from "ethereum-cryptography/secp256k1";

/**
 * 
 * @param  {...any} fns initial value and functions to pipe 
 * @returns {any} result of last transformation
 */
const pipe = (...fns) => { const initial = fns.splice(0, 1)[0]; return fns.reduce((last, pipeStep) => pipeStep(last), initial) }

/**
 * @param {string} publicKey ECDSA public key 
 * @returns {string} Ethereum address as hex string
 */
function getAddress(publicKey) {
    return pipe(
        publicKey.slice(1),
        keccak256,
        hash => hash.slice(-20),
        toHex
    )
}

/**
 * 
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
 * 
 * @param {string} message any text
 * @param {Uint8Array} signature ECDSA signature
 * @param {number} recoveryBit recovery bit
 * @returns {Promise<Uint8Array>} ECDSA public key
 */
async function recoverKey(message, signature, recoveryBit) {
    return pipe(
        message,
        hashMessage,
        m => secp.recoverPublicKey(m, signature, recoveryBit)
    )
}

/**
 * 
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

export { pipe, getAddress, hashMessage, recoverKey, signMessage }
