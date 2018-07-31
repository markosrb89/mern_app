
class Auth {
    /**
     * Authenticate a user. 
     * Save a token string in Local Storage
     * @param {string} token
     */
    static authenticateUser(token) {
        localStorage.setItem("AuthToken", token);
    }

    /**
   * Check if a user is authenticated.
   * Check if a token is saved in Local Storage
   * @returns {boolean}
   */
  static isUserAuthenticated() {
      return localStorage.getItem("AuthToken") !== null;
  }

  /**
   * Remove a token from Local Storage.
   */
  static deauthenticateUser() {
      localStorage.removeItem("AuthToken");
  }

  /**
   * Get a token value.
   * @returns {string}
   */
  static getToken() {
      return localStorage.getItem("AuthToken");
  }
}

export default Auth;