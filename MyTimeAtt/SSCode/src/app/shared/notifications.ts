import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
@Injectable()
export class Notifications {
    constructor(private _notifcation: NotificationsService) {

    }
    public showSuccess(title: string, body: string): string {

        return this._notifcation.success(title, body).id;
    }
     public showError(title: string, body: string): string {

        return this._notifcation.error(title, body).id;
    }
}
