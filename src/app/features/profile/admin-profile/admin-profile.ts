import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AuthService, PlaysService } from '../../../core/services';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Play, User } from '../../../models';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  imports: [ReactiveFormsModule, CommonModule, FaIconComponent, MatTooltipModule, RouterModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProfile {
  private playsService = inject(PlaysService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  user = signal<User | null>(null);
  plays$: Observable<Play[]>;
  faTrashCan = faTrashCan;
  faCircleInfo = faCircleInfo;

  isEditMode = false;
  showPlays = false;

  editProfileForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
    })
    this.plays$ = this.playsService.plays$;
    this.playsService.getPlays().subscribe();
  }

  ngOnInit(): void {
    this.user.set(this.authService.currentUser())
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && this.user()) {
      this.editProfileForm.patchValue({
        username: this.user()?.username,
        email: this.user()?.email
      })
      this.cdr.detectChanges();
    }
  }

  togglePlays() {
    this.showPlays = !this.showPlays;
  }

  get username(): AbstractControl<any, any> | null {
    return this.editProfileForm.get('username')
  }

  get email(): AbstractControl<any, any> | null {
    return this.editProfileForm.get('email')
  }

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get usernameErrorMessage(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required';
    }
    if (this.username?.errors?.['minlength']) {
      return 'Username must be at least 5 chars';
    }
    return '';
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Email is required';
    }
    if (this.email?.errors?.['pattern']) {
      return 'Email is not valid';
    }
    return '';
  }

  onSave(): void {
    if (this.editProfileForm.valid) {
      const { username, email } = this.editProfileForm.value;

      const user = <User>{
        _id: this.user()?._id,
        username: username,
        email: email
      }

      this.authService.updateUser(user).subscribe({
        next: () => this.user.set(this.authService.currentUser())
        ,
        error: (err) => {
          console.error("Failed to update user", err)
        }
      });

      this.isEditMode = false;
      this.editProfileForm.reset();
      this.cdr.detectChanges();
    }
  }

  onDelete(playId: string): void {
    let answer = confirm("Are you sure you want to delete this play?");

    if (answer) {
      this.playsService.deletePlay(playId).subscribe({
        next: () => {
          this.cdr.markForCheck()
         },
        error: (err) => {
          console.error("Failed to delete play", err)
        }
      })
    } else {
      return;
    }
  }
}
