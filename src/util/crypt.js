import Cryptr from 'cryptr';
import { setStorage, getStorage } from './localStorage';

const cryptr = new Cryptr(process.env.REACT_APP_SAUNAAA_SECRET);

const storageKey = 'saunAAA-todo-storage';

function encryptAndStore(data) {
  const message = JSON.stringify(data);
  setStorage(storageKey, cryptr.encrypt(message));
}

function decryptFromStore() {
  return JSON.parse(cryptr.decrypt(getStorage(storageKey)));
}

export { encryptAndStore, decryptFromStore };
