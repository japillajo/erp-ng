import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/services/basic-authentication.service';

import { Md5 } from 'ts-md5/dist/md5';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''

  constructor(
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.basicAuthenticationService.logout()
  }

  handleJWTLogin() {
    const md5 = new Md5()
    const passwrdHash = md5.appendStr(this.password).end()

    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, passwrdHash).subscribe(
      data => {
        //console.log(data)
        this.basicAuthenticationService.retrieveMenuList(this.username)
        this.basicAuthenticationService.retrieveUserFullName(this.username)
        this.router.navigate(['welcome', this.username])
      },
      error => {
        //console.log(error.error)
        this.alertService.error(error.error)
      }
    )
  }

}
