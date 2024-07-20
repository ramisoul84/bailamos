import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../../_services/account.service';
import { LoginUserDto } from '../../../_models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../_services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  message: string = '';
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
      this.router.navigate(['profile/main']);
    }
  }

  subscriptions: Subscription[] = [];

  ngOnInit() {
    // Add subscription to subscriptions array

    this.subscriptions.push(
      // listen for login success/error

      this.accountService.loginSuccess.subscribe((success) => {
        this.loading = false;
        this.message = success
          ? 'Login was successful'
          : 'Wrong Email or Password!';

        setTimeout(() => {
          this.message = '';
        }, 1500);
      })
    );
  }

  onSubmit() {
    this.loading = true;
    const user: LoginUserDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.accountService.login(user);
  }

  ngOnDestroy(): void {
    // When component is destroyed, it is important to clean up subscriptions
    //this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
