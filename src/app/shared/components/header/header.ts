import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0
      })),
      state('open', style({
        height: '*',
        opacity: 1
      })),
      transition('closed <=> open', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class Header {
  protected authService = inject(AuthService)
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  protected role = this.currentUser()?.role;
  openMenu: boolean = false;

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
