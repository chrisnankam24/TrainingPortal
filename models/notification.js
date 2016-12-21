/**
 * Created by user on 10/25/2016.
 */
/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

//------------- 'NotificationType' Table processes ---------------//

// READ ALL notification type
exports.get_all_NotificationTypes = function (callback) {
    db_conn.query("SELECT * FROM notification_type", callback);
};

// READ a notification type
exports.get_NotificationType = function (notification_type_id, callback) { // NotificationTypeID to read from DB
    db_conn.query("SELECT * FROM notification_type WHERE NotificationTypeID = ?", [notification_type_id], callback);
};

// CREATE a notification type
exports.add_NotificationType = function (notification_type, callback) {
    db_conn.query("INSERT INTO notification_type(NotificationType) VALUES (?)", [notification_type], callback);
};

// UPDATE a notification type
exports.update_NotificationType = function (notification_type_id, notification_type, callback) {
    db_conn.query("UPDATE notification_type SET NotificationType = ? WHERE NotificationTypeID = ?", [notification_type, notification_type_id], callback);
};

// DELETE a notification type
exports.delete_NotificationType = function (notification_type_id, callback) {
    db_conn.query("DELETE FROM notification_type WHERE NotificationTypeID = ?", [notification_type_id], callback);
};


//------------- 'Notification' Table processes ---------------//

// READ ALL notification
exports.get_all_Notifications = function (callback) {
    db_conn.query("SELECT * FROM notification", callback);
};

// READ a notification
exports.get_Notification = function (notification_id, callback) { // NotificationTypeID to read from DB
    db_conn.query("SELECT * FROM notification WHERE NotificationID = ?", [notification_id], callback);
};

// CREATE a notification
exports.add_Notification = function (notification, callback) {
    db_conn.query("INSERT INTO notification(cuid, message, isViewed, " +
        "notificationTypeID, creationDate) VALUES (?, ?, ?, ?, ?)", [notification.cuid, notification.message,
        notification.isViewed, notification.notificationTypeID, notification.creationDate], callback);
};

// UPDATE a notification
exports.update_Notification = function (notification_id, notification, callback) {
    db_conn.query("UPDATE notification SET cuid = ?, message = ?, isViewed = ?, notificationTypeID = ?, " +
        "creationDate = ? WHERE notificationID = ?", [notification.cuid, notification.message,
        notification.isViewed, notification.notificationTypeID, notification.creationDate, notification_id], callback);
};

// DELETE a notification
exports.delete_Notification = function (notification_id, callback) {
    db_conn.query("DELETE FROM notification WHERE NotificationID = ?", [notification_id], callback);
};
