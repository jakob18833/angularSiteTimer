import {Injectable, inject} from '@angular/core'
import { SiteList } from './interfaces/siteList';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable ({
    providedIn: 'root',
})

export class DatabaseManagementService {
    http = inject(HttpClient);
    serverUrl = "http://localhost:3000/"; 

    async getData(username: string): Promise<SiteList> {
        let defaultValue: SiteList = {home:0, site1:0, site2:0, site3:0};

        try {
            const data = await firstValueFrom(this.http.get<SiteList>
                (`${this.serverUrl}file?username=${username}`));
            
            return data as SiteList;

        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 404) {
                    console.warn("Username not found. Continuing.")
                } else {
                    console.error("Error getting data: ", error);
                }
            } else {
                console.error("Error getting data: ", error);
            }
            return defaultValue;
        }


      
        

    }
    async sendData(data: SiteList, username: string) {
        try {
            const sendData = await firstValueFrom(this.http.post(this.serverUrl, 
            {"username":username, "data":data},
            {headers: {'Content-type': 'application/json'},
            responseType: 'text'}));
        } catch(error) {
            console.error("Error sending data: " , error);
        }
   
        


    }
}