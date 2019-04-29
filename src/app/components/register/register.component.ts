import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Md5 } from 'ts-md5';
import { Password, User } from '../users/users.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName = ''
  lastName = ''
  username = ''
  email = ''
  password = ''

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  saveUser() {
    const md5 = new Md5()
    const passwrdHash = md5.appendStr(this.password).end()

    let password: Password
    let user: User
    user = new User(this.username, this.email, this.firstName, 'A', this.lastName)
    password = new Password(passwrdHash, user)

    this.userService.register(password).subscribe(
      response => {
        //console.log(data)
        this.alertService.success(response.detail.message, true)
        this.router.navigate(['login'])
      }
    )
  }

}
