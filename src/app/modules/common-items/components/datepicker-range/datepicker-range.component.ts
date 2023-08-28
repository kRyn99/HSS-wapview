import { Component, OnInit, Output, EventEmitter, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 100%;
      width: 100%;
      line-height: calc(90vw / 7);
    }
    .custom-day.focused {
      background-color: #F6601B;
    }
    .custom-day.range, .custom-day:hover {
      background-color: #F6601B;
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(246,96,27, 0.5);
    }
  `]
})
export class DatepickerRangeComponent implements OnChanges {

  @Output() select = new EventEmitter<any>();
  @Output() navigate = new EventEmitter<any>();

  hoveredDate: NgbDate | null = null;

  @Input() fromDate: NgbDate;
  @Input() toDate: NgbDate;

  ngOnChanges() {
    this.fromDate = null;
    this.toDate = null
  }

  constructor(calendar: NgbCalendar) {

  }
  onNavigateEvent(e) {
    this.navigate.emit(e.next);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.emitDate();
    } else if (this.fromDate && !this.toDate) {
      if (date.after(this.fromDate)) {
        this.toDate = date;
        this.emitDate();
      }
      else {
        this.toDate = this.fromDate;
        this.fromDate = date;
        this.emitDate();
      }
    }
    else if (this.fromDate && this.toDate) {
      if (date.after(this.toDate)) {
        this.toDate = date;
        this.emitDate();
      }
      else if (date.before(this.fromDate)) {
        this.fromDate = date;
        this.emitDate();
      }
      else {
        this.fromDate = date;
        this.toDate = null;
        this.emitDate();
      }
    }
  }

  emitDate() {
    this.select.emit({
      fromDate: this.fromDate,
      toDate: this.toDate
    })
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}
