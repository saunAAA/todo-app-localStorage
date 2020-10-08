function setStorage(key, data) {
  localStorage.setItem(key, data);
}

function getStorage(key) {
  return localStorage.getItem(key);
}

export { setStorage, getStorage };
