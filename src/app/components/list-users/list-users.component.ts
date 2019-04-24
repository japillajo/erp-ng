import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { User } from '../users/users.component';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: User[]

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshUsers()
  }

  refreshUsers() {
    this.userService.retrieveAllUsers().subscribe(
      response => {
        //console.log(response);
        this.users = response.data
      },
      error => {
        console.log(error)
      }
    )
  }

  update(id) {
    console.log(`update ${id}`)
    this.router.navigate(['user', id])
  }

  disable(id) {
    const userToDisable = this.users[id]
    this.userService.disableUser(userToDisable.userId, userToDisable).subscribe(
      response => {
        //console.log(response)
        this.alertService.success(response.message)
        this.refreshUsers()
      },
      error => {
        console.log(error)
      }
    )
  }

  remove(id: any) {
    const userToDelete = this.users[id]
    this.userService.deleteUser(userToDelete.userId).subscribe(
      response => {
        //console.log(response)
        this.alertService.success(response.message)
        this.refreshUsers()
      },
      error => {
        console.log(error)
      }
    )
  }

}
