import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SignInRequest } from 'src/app/requests/SignInRequest';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm !: FormGroup

  private formBuilder: FormBuilder = inject(FormBuilder);

  private authService: AuthService = inject(AuthService);

  private router: Router = inject(Router);

  constructor() {
    /*
      Si los Validators lo coloco en un array aparte, son síncronos
      Si los coloco a la misma altura que el valor por defecto '' se consideran asíncronos
    */
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    })
  }

  get email() {
    return this.signInForm.get('email')
  }

  get password() {
    return this.signInForm.get('password')
  }

  signIn() {
    const signInRequest: SignInRequest = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value
    }

    this.authService.signIn(signInRequest).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    })
  }
}
