import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Md5 } from 'ts-md5';
import { RoleService } from 'src/app/services/data/role.service';

export class User {

  public role: Role

  constructor(
    public userId: string,
    public userEmail: string,
    public userName: string,
    public userState: string,
    public userLastname: string
  ) {

  }

  setRole(role) {
    this.role = role
  }
}

export class Role {

  constructor(
    public roleId: number,
    public roleName: string,
    public roleDetail: string
  ) {

  }
}

export class Password {

  constructor(
    public passwordText: any,
    public user: User
  ) {

  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  title = ''
  isNewUser: boolean

  firstName = ''
  lastName = ''
  username = ''
  email = ''
  state = ''
  states: any[]
  password = ''
  roleCode: number
  roles: Role[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    //if (this.router.url === '/user') {
    if (!this.route.snapshot.params['id']) {
      this.title = 'Nuevo Usuario'
      this.isNewUser = true
    } else {
      this.title = 'Modificar Usuario'
      this.isNewUser = false
      this.states = [{ 'value': 'A', 'label': 'Activo' }, { 'value': 'I', 'label': 'Inactivo' }, { 'value': 'L', 'label': 'Bloqueado' }]
      this.getUser()
      this.getRoles()
    }
  }

  saveUser() {
    const md5 = new Md5()
    if (this.isNewUser) {
      const passwrdHash = md5.appendStr(this.password).end()

      let password: Password
      let user: User
      user = new User(this.username, this.email, this.firstName, 'A', this.lastName)
      password = new Password(passwrdHash, user)

      this.userService.createUser(password).subscribe(
        response => {
          //console.log(data)
          this.alertService.success(response.detail.message, true)
          this.router.navigate(['users'])
        }
      )
    } else {
      //console.log(this.roleCode)
      //console.log(this.state)
      let passwrdHash = null
      let password: Password
      let user: User

      user = new User(this.username, this.email, this.firstName, this.state, this.lastName)

      let userRole = null
      this.roles.forEach(element => {
        if (element['roleId'].toString() === this.roleCode.toString())
          userRole = element
      });

      user.setRole(userRole)

      if (this.password !== '') {
        passwrdHash = md5.appendStr(this.password).end()
        password = new Password(passwrdHash, user)
      } else {
        password = new Password(this.password, user)
      }

      this.userService.updateUser(password).subscribe(
        response => {
          //console.log(data)
          this.alertService.success(response.detail.message, true)
          this.router.navigate(['users'])
        }
      )
    }
  }

  getUser() {
    let username = this.route.snapshot.params['id']

    this.userService.retrieveUser(username).subscribe(
      response => {
        let user: User = response.detail.data
        this.firstName = user.userName
        this.lastName = user.userLastname
        this.username = user.userId
        this.email = user.userEmail
        this.state = user.userState
        this.roleCode = user.role.roleId
      }
    )
  }

  getRoles() {
    this.roleService.retrieveAllUsers().subscribe(
      response => {
        this.roles = response.detail.data
      }
    )
  }

}

