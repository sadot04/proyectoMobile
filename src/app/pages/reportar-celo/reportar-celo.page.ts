
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportar-celo',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>♀️ Perrita en Celo</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form [formGroup]="form" (ngSubmit)="submit()">
      <ion-input formControlName="descripcion" label="Descripción" labelPlacement="floating"></ion-input>
      <ion-input formControlName="ubicacion" label="Ubicación" labelPlacement="floating"></ion-input>
      <ion-input formControlName="fecha" label="Fecha" type="date"></ion-input>
      <ion-button type="submit" expand="block" [disabled]="form.invalid">Enviar reporte</ion-button>
    </form>
  </ion-content>
  `
})
export default class ReportarceloPage {
  form = this.fb.group({
    descripcion: ['', Validators.required],
    ubicacion: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log("Reporte enviado:", this.form.value);
  }
}
