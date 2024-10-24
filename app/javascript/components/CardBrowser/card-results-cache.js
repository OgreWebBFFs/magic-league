import { stringifyHash } from "../../helpers/hooks/use-hash-params";

export const cacheCards = (cards, hashParams) =>
    window.sessionStorage.setItem(stringifyHash(hashParams), JSON.stringify(cards));

export const getCachedCards = (hashParams) => JSON.parse(window.sessionStorage.getItem(stringifyHash(hashParams)));

export const isCachedCards = (hashParams) =>
    globalThis.window && window.sessionStorage.getItem(stringifyHash(hashParams)) !== null;
