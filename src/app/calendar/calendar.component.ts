import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  days: { date: number; name: string }[] = [];
  todayIndex: number = 0;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    this.todayIndex = today.getDay();
    
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      this.days.push({
        date: date.getDate(),
        name: dayNames[i],
      });
    }
  }
}