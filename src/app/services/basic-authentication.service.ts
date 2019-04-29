import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  modules: any[] = []
  name: string

  constructor(
    private http: HttpClient
  ) { }

  executeJWTAuthenticationService(username, password) {

    return this.http.post<any>(`${API_URL}/authenticate`, { username, password })
      .pipe(
        map(
          response => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);

            return response;
          }
        )
      );
  }

  retrieveMenuList(username) {
    this.http.get<any>(`${API_URL}/modules/${username}/admin/erp`).subscribe(
      response => {
        if (response.detail.code === '0000') {
          this.modules = response.detail.data
        }
      })
  }

  retrieveUserFullName(username) {
    this.http.get<any>(`${API_URL}/users/${username}/admin/erp/${username}`).subscribe(
      response => {
        this.name = response.detail.data.userName + ' ' + response.detail.data.userLastname
      }
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
    return this.modules
  }
}

