import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { MovieDetailPage } from './movie-detail.page';
import { CalendarComponent } from '../../calendar/calendar.component' // Import the calendar component


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailPageRoutingModule
  ],
  declarations: [MovieDetailPage, CalendarComponent]
})
export class MovieDetailPageModule {}
