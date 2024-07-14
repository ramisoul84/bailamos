import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrl: 'profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.storage.getUser()?.user.id;
    if (id) {
      this.userService.getUser(id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  logout() {
    this.storage.removeUser();
    this.router.navigate(['login']);
  }
}
