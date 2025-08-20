import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { register as registerSwiperElements } from 'swiper/element-bundle'
import { provideAnimations } from '@angular/platform-browser/animations';

registerSwiperElements();

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), 
    provideAnimations()
  ]
})
.catch((err) => console.error(err));