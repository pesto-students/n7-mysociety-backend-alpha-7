module.exports = {
    SETTINGS: {
        ANNOUNCEMENT: {
            LATEST_DAYS: 7,
            PASTS_DAYS: 7,
        },
        DEFAULT_PAGE_LIMIT: 10,
    },
    AUTH: {
        SIGNUP: {
            CAN_NOT_CREATE_SOCIETY: "Can't able to create society.",
            USER_REGISTERED: "User register successfully.",
            EMAIL_ALREADY_EXIST: "Oops! Email is already in use!",
        },
        SIGNIN: {
            SOCIETY_NOT_FOUND: "Society data not found.",
            USER_NOT_FOUND: "User not found.",
            INVALID_PASSWORD: "Invalid Password!",
            NOT_CONFIRMED:
                "Invalid password, You are not verified yet by society admin. Contact society admin for more details.",
            INACTIVE:
                "You account is inactive. Contact society admin for more details.",
        },
        NO_TOKEN: "No token provided!",
        NOT_AUTHORIZED: "You are not authorized to use our service!",
    },
    PUBLIC: {
        ALL_SOCIETY_DATA: "Society Data.",
        SOCIETY_DATA_NOT_AVAILABLE: "Society Data not available.",
    },
    COMMON: {
        SOMETHING_WRONG: "Something want wrong please try again.",
    },
    EMAIL: {
        PROVIDE_VALID_TEMPLATE: "Please provide a valid template name.",
    },
    ANNOUNCEMENT: {
        TITLE_REQUIRED: "Announcement title is required!",
        TITLE_NOT_EMPTY: "Announcement title can't be empty!",
        DESC_REQUIRED: "Announcement description is required!",
        DESC_NOT_EMPTY: "Announcement description can't be empty!",
        UPDATED: "Announcement updated successfully.",
        CREATED: "Announcement created successfully.",
        DELETED: "Announcement deleted successfully.",
        ALL: "All announcements.",
        NOT_FOUND: "No announcement found.",
    },
    COMPLAINT: {
        TITLE_REQUIRED: "Complaint title is required!",
        TITLE_NOT_EMPTY: "Complaint title can't be empty!",
        DESC_REQUIRED: "Complaint description is required!",
        DESC_NOT_EMPTY: "Complaint description can't be empty!",
        UPDATED: "Complaint updated successfully.",
        CREATED: "Complaint created successfully.",
        DELETED: "Complaint deleted successfully.",
        ALL: "All complaints.",
        NOT_FOUND: "No complaint found.",
    },
};
