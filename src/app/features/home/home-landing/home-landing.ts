import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-home-landing',
  imports: [RouterModule],
  templateUrl: './home-landing.html',
  styleUrl: './home-landing.css'
})
export class HomeLanding {
  protected authService = inject(AuthService);

  readonly isLoggedIn = this.authService.isLoggedIn;
  protected role = this.authService.getCurrentUserRole();
}
