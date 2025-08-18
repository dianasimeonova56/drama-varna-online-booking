import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-landing',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-landing.html',
  styleUrl: './home-landing.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeLanding   {
  slides = [
    {
      src: 'images/dramavarna1.jpg',
      title: 'Theater'
    },
    {
      src: 'images/dramavarna2.jpg',
      title: 'Theater',
    }
  ];
}
