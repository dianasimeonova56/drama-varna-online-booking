import { Component } from '@angular/core';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';
import { Engine } from '@tsparticles/engine';
import { NgxParticlesModule } from "@tsparticles/angular";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [NgxParticlesModule, RouterModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class Confirmation {

  // particlesOptions = {
  //   preset: 'fireworks', 
  //   background: {
  //     color: "transparent"
  //   },
  // };

  // particlesInit = async (engine: Engine): Promise<void> => {
  //   await loadFireworksPreset(engine);
  // };
}
