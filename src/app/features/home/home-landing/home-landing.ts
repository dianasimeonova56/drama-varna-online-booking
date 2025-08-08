import { Component, computed, inject } from '@angular/core';
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
  readonly currentUser = this.authService.currentUser;
  protected role = computed(() => this.currentUser()?.role);
}
