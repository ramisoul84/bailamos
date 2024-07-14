import { Injectable } from '@angular/core';
import { ResponseLoginDto } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class StorageService {
  storageName = 'bailamos_user';

  setUser(user: ResponseLoginDto) {
    localStorage.setItem(this.storageName, JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem(this.storageName);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.storageName)!);
  }
}
