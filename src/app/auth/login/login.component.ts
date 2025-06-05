import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

const MAT_MODULES = [
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-login',
  imports: [MAT_MODULES, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.html', '../../shared/styles/auth-styles.scss'],
})
export class LoginComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  #fb = inject(FormBuilder);

  loginForm: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hidePassword = true;

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.#authService
        .login(email, password)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.#router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error(err.error.message || 'Login failed');
          },
        });
    }
  }
}
