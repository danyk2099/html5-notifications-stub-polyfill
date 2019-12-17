declare global {
    interface Window { Notification: any; }
}

export interface IOptions {
    actions: any;
    body: any;
    dir: any;
    lang: any;
    tag: any;
    icon: any;
    image: any;
}

export class NotificationPolyfill {    
    static permission: 'granted' | 'denied' | 'default' = 'default';
    static maxActions: number = 10;

    public actions: any;
    public badge: any;
    public body: any;
    public data: any;
    public dir: any;
    public lang: any;
    public tag: any;
    public icon: any;
    public image: any;
    public renotify: any;
    public requireInteraction: any;
    public silent: any;
    public timestamp: any;
    public vibrate: any;

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

    constructor(public title: string, public options: IOptions) {
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
