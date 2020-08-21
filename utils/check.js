let check = {

  isNumber: (num) => typeof num === 'number',

  isString: (str) => {
    if (str === null) return false;

    return typeof str == "string" || (typeof str == "object" && str.constructor === String)
  },

  isDate: (date) => {
    if (date === null || Array.isArray(date) || check.isNumber(date)) return false;
    date = new Date(date)

    return (date.getTime() === date.getTime());
  },

  isPassword: (password) =>{
    if(password === undefined || Array.isArray(password)) return false;

    return /^\S{8,}$/.test(password);
  },

  isEmail: (email) =>{
    if(Array.isArray(email))return false

    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  }
}

module.exports = check; 