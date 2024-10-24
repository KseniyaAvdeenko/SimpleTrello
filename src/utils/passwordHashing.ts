import {Base64} from 'js-base64';

export function encodeToken(stringToEncode: string): string{
    return Base64.encode(stringToEncode)
}

export function decodeToken(stringToDecode: string): string{
    return Base64.decode(stringToDecode)
}