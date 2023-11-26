const adminDashboardStrings = {
    apiRoutes: {
        allUsers: "https://easeread-ai-backend.onrender.com/API/v1/users",
        singleUser: "https://easeread-ai-backend.onrender.com/API/v1/user/",
        logout: "https://easeread-ai-backend.onrender.com/API/v1/logout",
    },
    messages: {
        httpError: "HTTP error! Status: ",
        userListError: "Error getting users list: ",
        adminError: "Error making user admin: ",
        adminRemovError: "Error removing admin status from user: ",
        deletingUserError: "Error deleting user: ",

    },
    methods: {
        get: "GET",
        put: "PUT",
        patch: "PATCH",
        delete: "DELETE",
    },
    userListItem: {
        adminText: " - Admin: ",
        yes: "Yes",
        no: "No",
        makeAdminButton: "Make Admin",
        removeAdminButton: "Remove Admin",
        deleteUserButton: "Delete User"
    },
    contentType: "Content-Type",
    accessToken: "access_token",
    applicationJSON: "application/json",
    bearer: "Bearer"
}