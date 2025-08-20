import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaysService } from '../../../core/services/plays.service';
import { ErrorService } from '../../../core/services';

@Component({
  selector: 'app-create-play',
  imports: [ReactiveFormsModule],
  templateUrl: './create-play.html',
  styleUrl: './create-play.css'
})
export class CreatePlay {
  private playsService = inject(PlaysService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private errorService= inject(ErrorService)

  createPlayForm: FormGroup;

  constructor() {
    this.createPlayForm = this.formBuilder.group({
      playName: ['', [Validators.required, Validators.minLength(5)]],
      director: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      playDate: ['', [Validators.required, this.minDateValidator, this.timeRangeValidator]],
      place: ['', [Validators.required]]
    });
  }

  get playName(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('playName');
  }

  get director(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('director');
  }

  get description(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('description');
  }

  get imageUrl(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('imageUrl');
  }

  get playDate(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('playDate');
  }

  get place(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('place');
  }

  get isPlayNameValid(): boolean {
    return this.playName?.invalid && (this.playName?.dirty || this.playName?.touched) || false;
  }

  get isDirectorValid(): boolean {
    return this.director?.invalid && (this.director?.dirty || this.director?.touched) || false;
  }

  get isDescriptionValid(): boolean {
    return this.description?.invalid && (this.description?.dirty || this.description?.touched) || false;
  }

  get isImageUrlValid(): boolean {
    return this.imageUrl?.invalid && (this.imageUrl?.dirty || this.imageUrl?.touched) || false;
  }

  get isPlayDateValid(): boolean {
    return this.playDate?.invalid && (this.playDate?.dirty || this.playDate?.touched) || false;
  }

  get isPlaceValid(): boolean {
    return this.place?.invalid && (this.place?.dirty || this.place?.touched) || false;
  }

  get playNameErrorMessage(): string {
    if (this.playName?.errors?.['required']) {
      return 'Play name is required!';
    }

    if (this.playName?.errors?.['minlength']) {
      return 'Play name should have at least 5 characters!';
    }

    return '';
  }

  get directorErrorMessage(): string {
    if (this.director?.errors?.['required']) {
      return 'Director name is required!';
    }

    return '';
  }

  get descriptionErrorMessage(): string {
    if (this.description?.errors?.['required']) {
      return 'Description is required!';
    }

    if (this.description?.errors?.['minlength']) {
      return 'Description must be at least 25 chars!';
    }

    return '';
  }

  get imageUrlErrorMessage(): string {
    if (this.imageUrl?.errors?.['required']) {
      return 'ImageUrl is required!';
    }

    if (this.imageUrl?.errors?.['pattern']) {
      return 'ImageUrl should start with "http/s"!';
    }
    return '';
  }

  get playDateErrorMessage(): string {
    if (this.playDate?.errors?.['required']) {
      return 'Play Date is required!';
    }

    if (this.playDate?.errors?.['invaliddate']) {
      return 'Play Date should be after the current date!';
    }

    if (this.playDate?.errors?.['invalidtime']) {
      return 'Play Date Time should be between 10:00 and 20:00!';
    }
    return '';
  }

  get placeErrorMessage(): string {
    if (this.place?.errors?.['required']) {
      return 'Choosing a place is required!';
    }

    return '';
  }

  onSubmit(): void {
    if (this.createPlayForm.valid) {
      const body = this.createPlayForm.value;

      this.playsService.createPlay(body).subscribe({
        next: () => {
          this.router.navigate(['/plays']);
        },
        error: (err) => {
          console.error('Failed to create play:', err);
          this.markFormGroupTouched();
        }
      });
    } else {
      this.errorService.setError("Form is invalid!")
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.createPlayForm.controls).forEach(key => {
      const control = this.createPlayForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey)
          nestedControl?.markAllAsTouched();
        })
      } else {
        control?.markAsTouched();
      }
    })
  }
  timeRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value);
    const hour = date.getHours();

    if (hour < 10 || hour > 20) {
      return { invalidtime: true };
    }

    return null;
  }

  private minDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value);
    const currentDate = new Date();

    if (date < currentDate) {
      return { invaliddate: true };
    }
    return null;
  }
}
