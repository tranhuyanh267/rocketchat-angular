export class AuthorizationTokenStorage {
    static authToken
    static userId

    static setAuthToken(token) {
        AuthorizationTokenStorage.authToken = token
    }

    static setUserId(id) {
        AuthorizationTokenStorage.userId = id
    }

    static getAuthToken() {
        return AuthorizationTokenStorage.authToken
    }

    static getUserId() {
        return AuthorizationTokenStorage.userId
    }

}