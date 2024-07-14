import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  serverUrl: string;
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.serverUrl}/user`);
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.serverUrl}/user/${id}`);
  }
}
