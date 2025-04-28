import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importa la cámara de Capacitor

@Component({
  selector: 'app-reportar-basura',
  templateUrl: './reportar-basura.html',
  styleUrls: ['./reportar-basura.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export default class ReportarbasuraPage {
  form = this.fb.group({
    descripcion: ['', Validators.required],
    ubicacion: ['', Validators.required],
    fecha: ['', Validators.required],
    foto:[''] // Campo para la foto

  });

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}


  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Devuelve la foto como Data URL
        source: CameraSource.Camera, // Usa la cámara
      });

      // Guarda la foto en el formulario
      this.form.patchValue({ foto: image.dataUrl });
      console.log('Foto tomada:', image.dataUrl);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  async submit() {
    if (this.form.valid) {
      const reportData = this.form.value;

      try {
        // Obtén el usuario autenticado
        const currentUser = await this.authService.getCurrentUser();
        if (currentUser) {
          const userEmail = currentUser.email;

          // Busca los datos del usuario en Firestore por correo
          const userCollection = collection(this.firestore, 'usuarios');
          const userQuery = query(userCollection, where('email', '==', userEmail));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Obtén el primer documento que coincida
            const userData = userDoc.data();

            // Combina los datos del formulario con los datos del usuario
            const fullReportData = {
              ...reportData,
              email: userEmail, // Correo del usuario autenticado
              nombre: userData['nombre'], // Nombre desde Firestore
              celular: userData['celular'] // Celular desde Firestore
            };

            // Guarda el reporte en Firestore
            const reportCollection = collection(this.firestore, 'reportes-basura');
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