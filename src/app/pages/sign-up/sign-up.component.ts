import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      name: new FormControl<string>(''),
      lastName: new FormControl<string>(''),
      email: new FormControl<string>(''),
      phoneNumber: new FormControl<string>(''),
      userName: new FormControl<string>(''),
      password: new FormControl<string>('')
    })
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
