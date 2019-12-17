export class NotificationPolyfill {
    static permission: 'granted' | 'denied' | 'default' = 'default';
    static maxActions: number = 10;

    public actions;
    public badge;
    public body;
    public data;
    public dir;
    public lang;
    public tag;
    public icon;
    public image;
    public renotify;
    public requireInteraction;
    public silent;
    public timestamp;
    public vibrate;

    static requestPermission = function() {
        switch (localStorage.allowNotifications) {
            case undefined:
                if (NotificationPolyfill.permission === 'default') {
                    NotificationPolyfill.permission = ( confirm('Do you grant permission?') ) ? 'granted' : 'denied';
                    localStorage.allowNotifications = NotificationPolyfill.permission;
                }
                break;

            default:
                NotificationPolyfill.permission = localStorage.allowNotifications;
        }
    };

    constructor(public title, public options) {
        this.actions = options.actions;
        this.body = options.body;
        this.dir = options.dir;
        this.lang = options.lang;
        this.tag = options.tag;
        this.icon = options.icon;
        this.image = options.image;
    }

    public onclick() {}
    public onclose() {}
    public onerror() {}
    public onshow() {}
    public close() {}
}

if (!window.Notification) {
    window.Notification = NotificationPolyfill;
}
