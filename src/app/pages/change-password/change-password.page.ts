import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.changePasswordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
    });
  }

  async onChangePassword() {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm.value).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: 'Password changed successfully',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: error.error.error || 'An error occurred',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      );
    }
  }

  ngOnInit() {
  }

}
