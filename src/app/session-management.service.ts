import {Injectable, inject, OnDestroy} from '@angular/core'
import { TimerLogic } from './timer-logic';
import { Encoder } from './encoder';


@Injectable({
    providedIn: 'root'
})
export class SessionManagementService {
    timerLogic = inject(TimerLogic);
    encoder = inject(Encoder);
    

    private isAuthenticated = false;
    private sessionKey = 'user_session';
    private userKey: string = "";



    setSession(username: string): void {
        this.userKey = this.encoder.encode(username);

        this.isAuthenticated = true;
    
        this.timerLogic.start(this.userKey);

    }

    getSession(): any | null {

        return this.userKey ? this.encoder.decode(this.userKey) : null;
    }

    getData(): string {
        return this.timerLogic.getData();
    }

    endSession() {
        this.userKey = "";
        this.isAuthenticated = false;
        this.timerLogic.exit()
    }

    getIsAuthenticated():boolean {
        return this.isAuthenticated;
    }
}