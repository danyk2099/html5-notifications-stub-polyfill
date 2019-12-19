function NotificationPolyfill(title, options) {
    this.title = title;
    this.options = options;
    this.actions = options.actions;
    this.body = options.body;
    this.dir = options.dir;
    this.lang = options.lang;
    this.tag = options.tag;
    this.icon = options.icon;
    this.image = options.image;
}

NotificationPolyfill.prototype.onclick = function () { };
NotificationPolyfill.prototype.onclose = function () { };
NotificationPolyfill.prototype.onerror = function () { };
NotificationPolyfill.prototype.onshow = function () { };
NotificationPolyfill.prototype.close = function () { };
NotificationPolyfill.permission = 'default';
NotificationPolyfill.maxActions = 10;

NotificationPolyfill.requestPermission = function () {
    switch (localStorage.allowNotifications) {
        case undefined:
            if (NotificationPolyfill.permission === 'default') {
                NotificationPolyfill.permission = (confirm('Do you grant permission?')) ? 'granted' : 'denied';
                localStorage.allowNotifications = NotificationPolyfill.permission;
            }
            break;
        default:
            NotificationPolyfill.permission = localStorage.allowNotifications;
    }
};

function checkIfNotificationsSupported() {
    if (!window.Notification) {
        window.Notification = NotificationPolyfill;
    }
}

checkIfNotificationsSupported();

module.exports = checkIfNotificationsSupported;
