import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TicketModalComponent } from 'src/app/ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  constructor(private modalController: ModalController) { }

  async openTicketModal() {
    const modal = await this.modalController.create({
      component: TicketModalComponent
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
