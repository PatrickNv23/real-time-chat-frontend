import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpRequest } from 'src/app/requests/SignUpRequest';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm !: FormGroup

  private formBuilder: FormBuilder = inject(FormBuilder);

  private authService: AuthService = inject(AuthService);

  constructor() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    })
  }

  get name() {
    return this.signUpForm.get('name')
  }

  get lastName() {
    return this.signUpForm.get('lastName')
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber')
  }

  get userName() {
    return this.signUpForm.get('userName')
  }

  get password() {
    return this.signUpForm.get('password')
  }

  signUp() {
    const signUpRequest: SignUpRequest = {
      name: this.signUpForm.value.name,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      phoneNumber: this.signUpForm.value.phoneNumber,
      userName: this.signUpForm.value.userName,
      password: this.signUpForm.value.password
    }

    this.authService.signUp(signUpRequest).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    })
  }
}
