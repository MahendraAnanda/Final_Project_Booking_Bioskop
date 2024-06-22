import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './services/app.interceptor';
import { TicketModalComponent} from './ticket-modal/ticket-modal.component';
import { TicketPage } from './pages/ticket/ticket.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TicketModalComponent, TicketPage, ],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  
}
