const loginStrings = {
    apiRoutes: {
        login: "https://easeread-ai-backend.onrender.com/API/v1/login",
        adminDashboard: "https://easeread-ai-backend.onrender.com/API/v1/admin-dashboard",
        logout: "https://easeread-ai-backend.onrender.com/API/v1/logout",
    },
    messages: {
        emptyUsername: "Please enter a valid username. It must not be empty.",
        validPassword: "Please enter a valid password.",
        httpError: "HTTP error! Status: ",
        tokenError: "Token not received in the server response",
        loginError: "Error during login:",
        adminError: "Error checking admin access:",
        logoutError: "Error logging out:",
        jwtError: "No JWT token found for logout",
        logoutSuccess: "Logout successful:",
    },
    methods: {
        get: "GET",
        post: "POST",
    },
    contentType: "Content-Type",
    applicationJSON: "application/json",
    bearer: "Bearer",
    accessToken: "access_token",
    documentCookie: "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly",
}
