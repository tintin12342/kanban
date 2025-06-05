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

const MAT_MODULES = [
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MAT_MODULES, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.html',
    '../../shared/styles/auth-styles.scss',
  ],
})
export class RegisterComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  #fb = inject(FormBuilder);

  registerForm: FormGroup = this.#fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hidePassword = true;

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    const { firstName, lastName, email, password } = this.registerForm.value;

    this.#authService
      .register({
        firstName,
        lastName,
        email,
        password,
      })
      .subscribe({
        next: () => {
          this.#router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(
            err.error?.message || 'Registration failed. Please try again.',
          );
        },
      });
  }
}
