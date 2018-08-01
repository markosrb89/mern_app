import validate from "validate.js";
import Auth from '../services/auth'

const baseUrl = "http://localhost:4000";
const baseApiUrl = "http://localhost:4000/api";

validate.validators.upperCaseRequired = function(value, options, key, attributes) {
    if(value && /[A-Z]{1}/.test(value) !== options) {
      return 'must contain at least one upper case letter'
    }
  }
  
  validate.validators.digitRequired = function(value, options, key, attributes) {
    if(value && /\d{1}/.test(value) !== options) {
      return 'must contain at least one digit'
    }
  }
  
  validate.validators.specialCharRequired = function(value, options, key, attributes) {
    const specials = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿×÷–—―‗‘’‚‛“”„†‡•…‰′″‹›‼‾⁄⁊₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾".split("")
    if (value && value.split("").filter(c => specials.indexOf(c) > -1).length > 0 !== options) {
      return 'must contain at least one special char'
    }
  }
  
  validate.validators.noWhiteSpace = function(value, options, key, attributes) {
    if(!/\s{1}/.test(value) !== options) {
      return 'cannot contain whitespaces'
    }
  }
  
  validate.validators.isBoolean = function(value, options) {
    if (value && validate.isBoolean(value) !== options) {
      return 'must be boolean'
    }
  }

const CONSTRAINTS = {
    username: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 128
        }
    },
    password: {
        presence: true,
        upperCaseRequired: true,
        digitRequired: true,
        specialCharRequired: true,
        noWhiteSpace: true,
        length: {
            minimum: 8,
            maximum: 30,
        }
    },
    passwordRepeat: {
        equality: "password"
    },
    firstName: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 256
        }
    },
    lastName: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 128
        }
    },
    email: {
        presence: true,
        email: true
    }
}

class User {

    // Utility methods
    static isLoggedIn() {
        return Auth.isUserAuthenticated()
    }

    static logOut() {
        Auth.deauthenticateUser()
    }
}

export async function login(email, password) {
    try {
        Auth.deauthenticateUser();
        const response = await fetch(`${baseApiUrl}/user/login`, {
            method: "POST",
            body: {
                email,
                password
            }
        });
        const user = response.json();
        Auth.authenticateUser(user.token);

        return user;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createUser(credentials) {
    try {
        Auth.deauthenticateUser();
        const response = await fetch(`${baseApiUrl}/user/register`, {
            method: "POST",
            body: { ...credentials }
        });
        const user = response.json();

        return user;
    } catch (error) {
        throw new Error(error);
    }
}

export function validateCreateUser(options) {
    return validate(options, CONSTRAINTS);
}


export default User;