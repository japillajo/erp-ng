import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(password) {
    return this.http.post<any>(`${API_URL}/users/admin/erp`, password)
  }

  retrieveAllUsers() {
    return this.http.get<any>(`${API_URL}/users/admin/erp`)
  }

  retrieveUser(id) {
    return this.http.get<any>(`${API_URL}/users/admin/erp/${id}`)
  }

  updateUser(password) {
    return this.http.put<any>(`${API_URL}/users/admin/erp`, password)
  }

  disableUser(id, user) {
    return this.http.put<any>(`${API_URL}/users/admin/erp/${id}`, user)
  }

  deleteUser(id) {
    return this.http.delete<any>(`${API_URL}/users/admin/erp/${id}`)
  }
}
