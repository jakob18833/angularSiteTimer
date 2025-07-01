import {Injectable, inject} from '@angular/core'
import {Router} from '@angular/router'
import { SessionManagementService } from './session-management.service';
import { DatabaseManagementService } from "./database-management.service";
import { SiteList } from './interfaces/siteList';


@Injectable({
    providedIn: 'root'
})

export class TimerLogic {
  private router = inject(Router);
  private db = inject(DatabaseManagementService);

  private curData: SiteList;
  private curUser: string;
  private run: boolean;

  constructor() {
    this.curData = {
      home: 0,
      site1: 0,
      site2: 0,
      site3: 0,
    };
    this.curUser = '';
    this.run = false;
  }

  getData(): string {
    const data: string[] = [];
    for (const key in this.curData) {
      const typedKey = key as keyof SiteList;
      data.push(`${key}: ${(Math.round(this.curData[typedKey] * 10) / 10).toFixed(1)}s`);
    }
    let result = data.join("\n");
    return result;
  }

  private seconds_since_epoch(){ return ( Date.now() / 1000 ) }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }
  

  async start(username: string) {
    this.curUser = username;
    this.curData = await this.db.getData(this.curUser);
    
    this.run = true;
    let lastSaveTime = this.seconds_since_epoch();
    let lastTime = this.seconds_since_epoch();

    while (this.run) {
      await this.delay(50);

      let curTime = this.seconds_since_epoch();
      let curSite = this.router.url.split('/').pop() as keyof SiteList;
      this.curData[curSite] += curTime - lastTime;
      lastTime = curTime;
      if (curTime - lastSaveTime >= 1) {
        await this.db.sendData(this.curData, this.curUser);

        lastSaveTime = curTime;
      }

    }
  }


  async exit() {
    this.run = false;
  }
}