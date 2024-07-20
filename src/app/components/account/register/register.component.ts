import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
  isMartch: boolean = false;
  public passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.formInit();
  }

  private formInit() {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null),
        gender: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          //Validators.pattern(this.passwordPattern),
        ]),
        passwordConfirm: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: this.customPasswordMatching.bind(this) }
    );
  }

  public customPasswordMatching(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirm')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatchError: true };
  }

  onSubmit() {
    const user: RegisterUserDto = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      gender: this.registerForm.value.gender,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
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
