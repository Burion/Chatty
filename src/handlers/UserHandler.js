import LocalStorageHandler from "./LocalStorageHandler";

export default class UserHandler {
    constructor() {
        this.localStorageHandler = new LocalStorageHandler()
    }

    getCurrentUserInfo = () => {
        let jwt = this.localStorageHandler.getValue("jwt")
        var user = this.decodeJwt(jwt)
        
        return {
            name: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        }
    }

    decodeJwt = token => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
}