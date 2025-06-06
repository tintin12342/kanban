import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  #authService = inject(AuthService);

  logout(): void {
    this.#authService.logout();
  }
}
