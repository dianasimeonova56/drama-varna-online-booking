import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected authService = inject(AuthService)
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  // protected role = this.authService.getCurrentUserRole();
  protected role = computed(() => this.currentUser()?.role);

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home'])
      }, error: (err) => {
        console.log("Logout error", err);
      }
    });
  }
}
