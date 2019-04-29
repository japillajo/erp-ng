import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  createUser(password) {
    return this.http.post<any>(`${API_URL}/users/${this.basicAuthenticationService.getAuthenticatedUser()}/admin/erp`, password)
  }

  register(password) {
    return this.http.post<any>(`${API_URL}/users/register/admin/erp`, password)
  }

  retrieveAllUsers() {
    return this.http.get<any>(`${API_URL}/users/${this.basicAuthenticationService.getAuthenticatedUser()}/admin/erp`)
  }

  retrieveUser(id) {
    return this.http.get<any>(`${API_URL}/users/${this.basicAuthenticationService.getAuthenticatedUser()}/admin/erp/${id}`)
  }

  updateUser(password) {
    return this.http.put<any>(`${API_URL}/users/${this.basicAuthenticationService.getAuthenticatedUser()}/admin/erp`, password)
  }

  disableUser(id, user) {
    return this.http.put<any>(`${API_URL}/users/${this.basicAuthenticationService.getAuthenticatedUser()}/admin/erp/${id}`, user)
  }

  deleteUser(id) {
    return this.http.delete<any>(`${API_URL}/users/${this.basicAuthenticationService.getAuthenticatedUser()}/admin/erp/${id}`)
  }
}
