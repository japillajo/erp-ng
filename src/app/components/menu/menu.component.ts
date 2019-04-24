import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from 'src/app/services/basic-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit() {
    if (this.basicAuthenticationService.isUserLoggedIn()) {
      this.basicAuthenticationService.retrieveMenuList(this.basicAuthenticationService.getAuthenticatedUser())
      this.basicAuthenticationService.retrieveUserFullName(this.basicAuthenticationService.getAuthenticatedUser())
    }
  }

}
