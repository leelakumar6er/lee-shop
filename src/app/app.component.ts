import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'lee-shop';

  constructor(private userService: UserService, private auth: AuthService, private route: Router) {
    this.auth.user$.subscribe(user => {

      if (!user) return;
      this.userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');

      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      this.route.navigateByUrl(returnUrl);

    })
  }
}
