import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {
  authService = inject(AuthService);
  isOpen = signal(true);
  
  editing = false;
  user = { ...this.authService.currentUser() };


  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.user = { ...this.authService.currentUser() };
    }
  }

  // save() {
  //   this.authService.updateUser(this.userCopy).subscribe(() => {
  //     this.editing = false;
  //   });
  // }
}
