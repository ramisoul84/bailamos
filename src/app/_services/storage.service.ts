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

  getToken(): string | null {
    const storage = localStorage.getItem(this.storageName);
    if (storage) {
      return JSON.parse(storage).accessToken;
    } else return null;
  }

  getIsAdmin(): boolean | null {
    const storage = localStorage.getItem(this.storageName);
    if (storage) {
      return JSON.parse(storage).user.isAdmin;
    } else return null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.storageName)!);
  }
}
