import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../_services/storage.service';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile-main.component.html',
  styleUrl: 'profile-main.component.scss',
})
export class ProfileMainComponent implements OnInit {
  user!: User;
  users!: User[];
  isAdmin: boolean | null = false;
  constructor(
    private storage: StorageService,
    private userService: UserService,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    const id = this.storage.getUser()?.user.id;
    this.isAdmin = this.storage.getIsAdmin();
    if (id) {
      this.userService.getUser(id).subscribe((data) => {
        this.user = data;
        this.userService.getAllUsers().subscribe((data1) => {
          this.users = this.showPartners(data1, data.gender);
        });
      });
    }
  }

  logout() {
    this.account.logout();
  }

  showPartners(users: User[], gender: string) {
    const partners = users.filter((user) => user.gender !== gender);
    return partners;
  }
}
