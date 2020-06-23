let check = {
  
  isNumber: (num) => /^-?[\d.]+(?:e-?\d+)?$/.test(num),

  isString: (str) => typeof str == "string" || (typeof str == "object" && str.constructor === String),

  isDate: (date) => (new Date(date) !== "Invalid Date") && !isNaN(new Date(date)),

  isPassword: (password) => /^\S{8,}$/.test(password),
    
  isEmail: (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

}

module.exports = check ; 