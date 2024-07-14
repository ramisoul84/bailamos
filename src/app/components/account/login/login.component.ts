import { Component } from '@angular/core';
import { AccountService } from '../../../_services/account.service';
import { LoginUserDto } from '../../../_models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    if (this.storageService.getUser()) {
      console.log(this.storageService.getUser());
      this.router.navigate(['profile']);
    }
  }

  onSubmit() {
    const user: LoginUserDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.accountService.login(user).subscribe({
      next: (value) => {
        this.storageService.setUser(value);
        this.router.navigate(['profile']);
      },

      error: (err) => {
        console.error('Observable emitted an error: ' + err.message);
      },
    });
  }
}
