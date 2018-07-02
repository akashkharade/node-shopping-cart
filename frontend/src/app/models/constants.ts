export class Constants {
    
    /** The Constant RETURN_URL. */
    public static get RETURN_URL(): string { return "returnUrl"; };

    /** The Constant LOGOUT_SERVICE_URL. */
    public static get LOGOUT_SERVICE_URL(): string { return "http://localhost:5000/api/logout"; };

    /** The Constant CHECK_IF_USER_ALREADY_LOGIN_SERVICE_URL. */
    public static get CHECK_IF_USER_ALREADY_LOGIN_SERVICE_URL(): string { return "http://localhost:5000/api/current_user"; };
}