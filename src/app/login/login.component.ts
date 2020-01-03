import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  /**
   *Creates an instance of LoginComponent.
   * @param {AuthService} auth
   * @memberof LoginComponent
   */
  constructor(public auth: AuthService) { }

  /**
   *
   *
   * @memberof LoginComponent
   */
  login() {
    this.auth.login();
  }
}
