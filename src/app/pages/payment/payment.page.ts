import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  items = [
    {
      name: 'Item 1',
      image: 'assets/img/godzilla.jpeg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
