import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, PlaysService } from '../../../core/services';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-play',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-play.html',
  styleUrl: './edit-play.css'
})
export class EditPlay {
  // private authService = inject(AuthService);
  private playsService = inject(PlaysService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  editPlayForm: FormGroup;
  playId: string | null = null;

  constructor() {
    this.editPlayForm = this.formBuilder.group({
      playName: ['', [Validators.required, Validators.minLength(5)]],
      director: [''],
      description: ['', [Validators.required, Validators.minLength(25)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      playDate: ['', [Validators.required, this.minDateValidator, this.timeRangeValidator]],
      place: ['', [Validators.required]]
    })

    this.playId = this.route.snapshot.paramMap.get('playId');

    if (this.playId) {
      this.loadPlay(this.playId);
    }
  }
  private loadPlay(id: string) {
    this.playsService.getPlay(id).subscribe({
      next: (play) => {
        this.editPlayForm.patchValue({
          playName: play.playName,
          director: play.director,
          description: play.description,
          imageUrl: play.imageUrl,
          playDate: play.playDate,
          place: play.place
        });
      },
      error: (err) => {
        console.error('Failed to load play', err);
      }
    });
  }

  get playName(): AbstractControl<any, any> | null {
    return this.editPlayForm.get('playName');
  }

  get director(): AbstractControl<any, any> | null {
    return this.editPlayForm.get('director');
  }

  get description(): AbstractControl<any, any> | null {
    return this.editPlayForm.get('description');
  }

  get imageUrl(): AbstractControl<any, any> | null {
    return this.editPlayForm.get('imageUrl');
  }

  get playDate(): AbstractControl<any, any> | null {
    return this.editPlayForm.get('playDate');
  }


  get isPlayNameValid(): boolean {
    return this.playName?.invalid && (this.playName?.dirty || this.playName?.touched) || false;
  }

  get isDescriptionValid(): boolean {
    return this.description?.invalid && (this.description?.dirty || this.description?.touched) || false;
  }

  get isImageUrlValid(): boolean {
    return this.imageUrl?.invalid && (this.imageUrl?.dirty || this.imageUrl?.touched) || false;
  }

  get playNameErrorMessage(): string {
    if (this.playName?.errors?.['required']) {
      return 'playName is required!';
    }

    if (this.playName?.errors?.['minlength']) {
      return 'playName should have at least 5 characters!';
    }

    return '';
  }

  get descriptionErrorMessage(): string {
    if (this.description?.errors?.['required']) {
      return 'description is required!';
    }

    if (this.description?.errors?.['pattern']) {
      return 'description must be at least 25 chars!';
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

    if (this.playDate?.errors?.['invalidDate']) {
      return 'Play Date should be before the current date!';
    }
    if (this.playDate?.errors?.['invalidTime']) {
      return 'Play Date Time should be between 10:00 and 20:00!';
    }
    return '';
  }
  onSubmit(): void {
    if (this.editPlayForm.valid && this.playId) {
      this.playsService.editPlay(this.playId, this.editPlayForm.value).subscribe({
        next: () => this.router.navigate(['/plays']),
        error: (err) => {
          console.error('Failed to update play:', err);
          this.markFormGroupTouched();
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.values(this.editPlayForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  timeRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value);
    const hour = date.getHours();

    if (hour < 10 || hour > 20) {
      return { invalidTime: true };
    }

    return null;
  }

  //TODO
  private minDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value);
    const currentDate = new Date();

    if (date < currentDate) {
      return { invalidDate: true };
    }
    return null;
  }
}

