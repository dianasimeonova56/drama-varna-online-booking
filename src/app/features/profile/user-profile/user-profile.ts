import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { AuthService, BookingService, ErrorService } from '../../../core/services';
import { RouterLink } from '@angular/router';
import { PopulatedBooking, User } from '../../../models';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfile implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService)
  bookedPlaysNum = signal(0);
  user = signal<User | null>(null);

  isEditMode = false;

  editProfileForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
    })
  }

  ngOnInit(): void {
    this.user.set(this.authService.currentUser())
    this.bookingService.getBookings(this.authService.getCurrentUserId() ?? null).subscribe({
      next: (plays: PopulatedBooking[]) => this.bookedPlaysNum.set((plays?.length) ?? 0),
      error: (err) => {
        this.errorService.setError(`Failed to load user: ${err}`)
      }
    });
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
          this.errorService.setError(`Failed to save user: ${err}`)
        }
      });

      this.isEditMode = false;
      this.editProfileForm.reset();
      this.cdr.detectChanges();
    }
  }
}
