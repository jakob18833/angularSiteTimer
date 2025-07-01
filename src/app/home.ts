import {Component, inject} from '@angular/core';
import { SessionManagementService } from './session-management.service';


@Component({
    selector: 'app-home',
    template: `<pre>{{ userSession.getData() }}</pre>`,


})
export class Home {
    
    userSession = inject(SessionManagementService);

    
}