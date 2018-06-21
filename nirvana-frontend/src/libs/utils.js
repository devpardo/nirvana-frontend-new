export const indexOf = function(arr, gid) {
  let index = -1;
  let length = arr.length;
  if (length > 0) {
    if (!arr[0].gid) {
      for (let i = 0; i < length; i++) {
        if (arr[i].id === gid) {
          index = i;
          break;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (arr[i].gid === gid) {
          index = i;
          break;
        }
      }
    }
  }
  return index;
};
export const lastIndexOf = function(arr, gid) {
  let lastIndex = -1;
  arr.forEach(function(e, index) {
    if (e.gid === gid) {
      lastIndex = index;
    }
  });
  return lastIndex;
};
export const positiveInteger = function(value) {
  let dataExp = /^[1-9]+[0-9]*]*$/;
  return dataExp.test(value);
};
export const regularExpression = function(type, value) {
  if (type === "email") {
    let emailExp = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return emailExp.test(value);
  } else if (type === "mobile") {
    let mobileExp = /^1\d{10}$/;
    return mobileExp.test(value) && value.length <= 11;
  } else if (type === "name") {
    let len = value.toString().length;
    return len >= 7 && len <= 12;
  } else if (type === "password") {
    let len = value.toString().length;
    return len >= 8 && len <= 20;
  } else if (type === "bank") {
    let bankExp = /^\d{16}|\d{19}$/;
    return bankExp.test(value);
  }
};
export const transitionRun = function() {
  let el = document.createElement("demo");
  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };
  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};

export const debounce = function(inner, ms = 0) {
  let timer = null;
  let resolves = [];

  return function(...args) {
    // Run the function after a certain amount of time
    clearTimeout(timer);
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      let result = inner(...args);
      resolves.forEach(r => r(result));
      resolves = [];
    }, ms);

    return new Promise(resolve => resolves.push(resolve));
  };
};
