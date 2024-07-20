import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users!: User[];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
