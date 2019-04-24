import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { ArrayUtilService } from './utils/array-util.service';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  modules: any[] = []
  name: string

  constructor(
    private http: HttpClient,
    private arrayUtilService: ArrayUtilService
  ) { }

  executeJWTAuthenticationService(username, password) {

    return this.http.post<any>(`${API_URL}/authenticate`, { username, password })
      .pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);

            return data;
          }
        )
      );
  }

  retrieveMenuList(username) {
    this.http.get<any>(`${API_URL}/modules/admin/erp/${username}`).subscribe(
      data => {
        if (data.code === '0000') {
          this.modules = data.data
        }
      })
  }

  retrieveUserFullName(username) {
    this.http.get<any>(`${API_URL}/users/admin/erp/${username}`).subscribe(
      data => this.name = data.data.userName + ' ' + data.data.userLastname
    )
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
    this.modules = []
  }

  getUserFullName() {
    return this.name
  }

  getUserMenu() {
    return this.modules;
  }

}

