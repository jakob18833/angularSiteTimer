import {Component, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { SessionManagementService } from './session-management.service';



@Component({
  selector: 'app-user',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>Provide a non-empty username:<br><br>
        <input type="text" formControlName="username"/>
      </label>
     
      <button type="submit" [disabled]="profileForm.invalid">Submit</button>
    </form>
  `,

  imports: [ReactiveFormsModule],

})
export class User {
  constructor(private sessionService: SessionManagementService) {}

  profileForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
  })


  handleSubmit() {
    this.sessionService.setSession(this.profileForm.value.username!)

 
  }

}
