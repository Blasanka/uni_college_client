import jwtDecode from "jwt-decode";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    localStorage.removeItem("FBIdToken");
    this.authenticated = false;
  }

  isAuthenticated() {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        // window.location.href = "/login";
        this.authenticated = false;
      } else {
        this.authenticated = true;
      }
    } else {
      this.authenticated = false;
    }
    return this.authenticated;
  }
}

export default new Auth();
