import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import secp from "ethereum-cryptography/secp256k1";

const pipe = (...fns) => { const initial = fns.splice(0, 1)[0]; return fns.reduce((last, pipeStep) => pipeStep(last), initial) }

function getAddress(publicKey) {
    return pipe(
        publicKey.slice(1),
        keccak256,
        hash => hash.slice(-20)
    )
}

function hashMessage(message) {
    return pipe(
        message,
        utf8ToBytes,
        keccak256
    )
}

async function recoverKey(message, signature, recoveryBit) {
    return pipe(
        message,
        hashMessage,
        m => secp.recoverPublicKey(m, signature, recoveryBit)
    )
}

async function signMessage(msg, privateKey) {
    return pipe(
        msg,
        hashMessage,
        async m => await secp.sign(m, privateKey, { recovered: true })
    )
}

export { pipe, getAddress, hashMessage, recoverKey, signMessage }
