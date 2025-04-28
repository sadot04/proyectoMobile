import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';
import { heart, calendar, musicalNote, home, statsChart, documentText, notifications } from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class MainPage implements OnInit {
  constructor(private navCtrl: NavController) {
    addIcons({ heart, calendar, musicalNote, home, statsChart, documentText, notifications,});

  }

  goToReportes() {
    this.navCtrl.navigateForward('/reportes', {
      animated: true,
      animationDirection: 'forward', // Desliza hacia la derecha
    });
  }



  ngOnInit() {}
}
