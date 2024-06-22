import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup = new FormGroup({});
  user: any = null;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if(!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
    });
  }

  async signInGoogle() {
    try {
      const googleUser = await GoogleAuth.signIn();
      const idToken = googleUser.authentication.idToken;

      const loading = await this.loadingCtrl.create({
        message: 'Please wait',
      });

      await loading.present();

      this.authService.loginWithGoogle(idToken).subscribe({
        next: (response: any) => {
          loading.dismiss();
          this.form.reset();

          localStorage.setItem('expenseAppToken', response.token);
          localStorage.setItem('name', response.name);
          this.router.navigateByUrl('/tabs/home');
        },
        error: (error) => {
          loading.dismiss();
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
    });

    await loading.present();

    this.authService.login(this.form.value).subscribe({
      next: (response: any) => {
        loading.dismiss();
        this.form.reset();

        localStorage.setItem('expenseAppToken', response.token);
        localStorage.setItem('name', response.name);
        this.router.navigateByUrl('/tabs/home');
      },
      error: (error) => {
        loading.dismiss();
        console.log(error);
      }
    });
  }
}
