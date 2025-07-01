import {Component, inject} from '@angular/core';
import {RouterOutlet, RouterLink, Router} from '@angular/router';
import { SessionManagementService } from './session-management.service';
import { User } from "./user"

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <div [hidden]="!userSession.getIsAuthenticated()">
    <nav>
      <a routerLink="/home">Home</a>
      |
      <a routerLink="/site1">Site 1</a>
      |
      <a routerLink="/site2">Site 2</a>
      |
      <a routerLink="/site3">Site 3</a>
    </nav>
          
    <p>Username: {{ userSession.getSession() }}</p>

    <button (mousedown)="userSession.endSession()">Logout</button>

  
    <router-outlet /> 
  </div>

  <div [hidden]="userSession.getIsAuthenticated()">
    <app-user></app-user>
  </div>

    `,

  imports: [RouterOutlet, RouterLink, User],
})

export class App {
  userSession = inject(SessionManagementService);

  
}
  
