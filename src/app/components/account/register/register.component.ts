import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { RegisterUserDto } from '../../../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const user: RegisterUserDto = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      gender: this.registerForm.value.gender,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    console.log(user);
    this.accountService.register(user).subscribe({
      next: (value) => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Observable emitted an error: ' + err.message);
      },
    });
  }
}
