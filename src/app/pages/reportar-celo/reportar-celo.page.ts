import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reportar-celo',
  standalone: true,
  styleUrls: ['./reportar-celo.scss'],
  templateUrl: './reportar-celo.html',
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export default class ReportarceloPage {
  form = this.fb.group({
    descripcion: ['', Validators.required],
    ubicacion: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async submit() {
    if (this.form.valid) {
      const reportData = this.form.value;

      try {
        const currentUser = await this.authService.getCurrentUser();
        if (currentUser) {
          const userEmail = currentUser.email;

          const userCollection = collection(this.firestore, 'usuarios');
          const userQuery = query(userCollection, where('email', '==', userEmail));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            const fullReportData = {
              ...reportData,
              email: userEmail,
              nombre: userData['nombre'],
              celular: userData['celular']
            };

            const reportCollection = collection(this.firestore, 'reportes-celo');
            await addDoc(reportCollection, fullReportData);

            console.log('Reporte enviado exitosamente:', fullReportData);
          } else {
            console.error('No se encontraron datos del usuario en Firestore.');
          }
        } else {
          console.error('No se pudo obtener el usuario autenticado.');
        }
      } catch (error) {
        console.error('Error al enviar el reporte:', error);
      }
    }
  }
}