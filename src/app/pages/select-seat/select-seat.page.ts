import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.page.html',
  styleUrls: ['./select-seat.page.scss'],
})
export class SelectSeatPage implements OnInit {

  showModal: boolean = true; // Default true to show modal in other pages

  seats: any[][] = [
    [
      { label: 'A', selected: false, occupied: false }, { label: 'B', selected: false, occupied: false }, 
      { label: 'C', selected: false, occupied: false }, { label: 'D', selected: false, occupied: false },
      { label: 'E', selected: false, occupied: false }, { label: 'F', selected: false, occupied: true },
      { label: 'G', selected: false, occupied: false }, { label: 'H', selected: false, occupied: false }
    ],
    [
      { label: 'A', selected: false, occupied: false }, { label: 'B', selected: false, occupied: true }, 
      { label: 'C', selected: false, occupied: false }, { label: 'D', selected: false, occupied: false },
      { label: 'E', selected: false, occupied: false }, { label: 'F', selected: false, occupied: false },
      { label: 'G', selected: false, occupied: true  }, { label: 'H', selected: false, occupied: false }
    ],
    [
      { label: 'A', selected: false, occupied: false }, { label: 'B', selected: false, occupied: false }, 
      { label: 'C', selected: false, occupied: true }, { label: 'D', selected: false, occupied: false },
      { label: 'E', selected: false, occupied: false }, { label: 'F', selected: false, occupied: false },
      { label: 'G', selected: false, occupied: false }, { label: 'H', selected: false, occupied: true }
    ],
    [
      { label: 'A', selected: false, occupied: false }, { label: 'B', selected: false, occupied: false }, 
      { label: 'C', selected: false, occupied: false }, { label: 'D', selected: false, occupied: false },
      { label: 'E', selected: false, occupied: false }, { label: 'F', selected: false, occupied: false },
      { label: 'G', selected: false, occupied: false }, { label: 'H', selected: false, occupied: false }
    ],
    [
      { label: 'A', selected: false, occupied: false }, { label: 'B', selected: false, occupied: false }, 
      { label: 'C', selected: false, occupied: false }, { label: 'D', selected: false, occupied: false },
      { label: 'E', selected: false, occupied: false }, { label: 'F', selected: false, occupied: false },
      { label: 'G', selected: false, occupied: false }, { label: 'H', selected: false, occupied: false }
    ],
    [
      { label: 'A', selected: false, occupied: false }, { label: 'B', selected: false, occupied: false }, 
      { label: 'C', selected: false, occupied: false }, { label: 'D', selected: false, occupied: false },
      { label: 'E', selected: false, occupied: false }, { label: 'F', selected: false, occupied: false },
      { label: 'G', selected: false, occupied: false }, { label: 'H', selected: false, occupied: false }
    ]
  ];

  constructor(private modalCtrl: ModalController, private router: Router) { }

  async ionViewWillEnter() {
    // Menutup modal jika terbuka dan berada di halaman select-seat
    if (this.router.url.includes('select-seat')) {
      this.showModal = false;
      await this.modalCtrl.dismiss();
    } else {
      this.showModal = true;
    }
  }

  ngOnInit() { }

  selectSeat(row: number, col: number) {
    if (!this.seats[row][col].occupied) {
      this.seats[row][col].selected = !this.seats[row][col].selected;
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
