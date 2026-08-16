import api from "./api";

// Fetch notifications for the current user
export const fetchNotifications = async () => {
    try {
        const response = await api.get("/messaging/notifications/");
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await api.patch(`/messaging/notifications/${notificationId}/read/`);
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
};
