import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthService, private alertCtrl: AlertController, private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('name') || '';
  }

  onLogout() {
    this.alertCtrl
      .create({
        header: 'Logout',
        message: 'Are you sure want to leave',
        buttons: [
          { text: 'Stay' },
          {
            text: 'Leave',
            handler: () => {
              this.authService.logout().subscribe({
                next: () => {
                  localStorage.removeItem('expenseAppToken');
                  this.router.navigateByUrl('/login');
                },
                error: (error) => {
                  // handle error
                  console.log(error);
                },
              });
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

}
