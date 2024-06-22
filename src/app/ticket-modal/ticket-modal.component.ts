import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
