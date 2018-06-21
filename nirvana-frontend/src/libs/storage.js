import cookie from "./cookie";
const isInObject = (key, object) => key in object;
export const set = (key, value) => {
  cookie.set(key, value);
  if (isInObject("sessionStorage", window)) {
    sessionStorage.setItem(key, value);
  }
  if (isInObject("localStorage", window)) {
    localStorage.setItem(key, value);
  }
};

export const get = key => {
  return (
    cookie.get(key) || sessionStorage.getItem(key) || localStorage.getItem(key)
  );
};

export const remove = key => {
  cookie.remove(key);
  if (isInObject("sessionStorage", window)) {
    sessionStorage.removeItem(key);
  }
  if (isInObject("localStorage", window)) {
    localStorage.removeItem(key);
  }
};
