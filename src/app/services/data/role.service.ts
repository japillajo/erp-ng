import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllUsers() {
    return this.http.get<any>(`${API_URL}/roles/admin/erp`);
  }
}
