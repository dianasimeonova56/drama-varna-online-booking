import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  private formBuilder = inject(FormBuilder);

  searchForm: FormGroup;

  constructor() {
    this.searchForm = this.formBuilder.group({
      playName: [''],
      director: [''],
      playDate: [''],
    });
  }

  get playName(): AbstractControl<any, any> | null {
    return this.searchForm.get('playName');
  }

  get director(): AbstractControl<any, any> | null {
    return this.searchForm.get('director');
  }
  get playDate(): AbstractControl<any, any> | null {
    return this.searchForm.get('playDate');
  }

  @Output() searchEvent = new EventEmitter<{ playName?: string; director?: string; playDate?: Date }>();

  search() {
    this.searchEvent.emit({
      playName: this.searchForm.value.playName,
      director: this.searchForm.value.director,
      playDate: this.searchForm.value.playDate
    });
  }
}
