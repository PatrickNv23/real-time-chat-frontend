import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    this.signInForm = this.formBuilder.group({
      email: new FormControl<string>(''),
      password: new FormControl<string>('')
    })
  }

  signIn() {
    const signInRequest: SignInRequest = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }

    this.authService.signIn(signInRequest).subscribe({
      next: (response: any) => {
        console.log(response);

        /*
        if (!JSON.parse(localStorage.getItem('user') as string)) {
          localStorage.setItem('user', JSON.stringify(response))
          this.router.navigate(['/home'])
        }*/
      }
    })
  }
}
