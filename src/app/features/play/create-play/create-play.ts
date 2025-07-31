import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services';
import { Router } from '@angular/router';
import { PlaysService } from '../../../core/services/plays.service';

@Component({
  selector: 'app-create-play',
  imports: [ReactiveFormsModule],
  templateUrl: './create-play.html',
  styleUrl: './create-play.css'
})
export class CreatePlay {
  private authService = inject(AuthService);
  private playsService = inject(PlaysService)
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  createPlayForm: FormGroup;

  //director - array
  // playName
  // description
  // date
  // imageUrl
  // ratings
  // place
  constructor() {
    this.createPlayForm = this.formBuilder.group({
      playName: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      playDate: ['', [Validators.required]],
      place: ['', [Validators.required]]
    },
  {validators:this.minDateValidator})
  }

  get playName(): AbstractControl<any, any> | null {
    return this.createPlayForm.get('playName');
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
    return '';
  }

  onSubmit(): void {
    if (this.createPlayForm.valid) {
      const body  = this.createPlayForm.value;

      const response = this.playsService.createPlay(body);

      if (response) {
        this.router.navigate(['/plays']);
      } else {
        this.markFormGroupTouched();
      }
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

  //TODO
  private minDateValidator(playDate: AbstractControl): ValidationErrors | null {
    
    const date = playDate.value; 
    const currentDate = new Date();
    if(date < currentDate) {
      console.log('invalid date', date, currentDate);
      
      return {invalidDate: true}
    }
    return null;
  }
}
