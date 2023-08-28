import { Component, OnInit, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picker-popup',
  templateUrl: './picker-popup.component.html',
  styleUrls: ['./picker-popup.component.scss']
})
export class PickerPopupComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngay: number;
  thang: number;
  nam: number;
  @Input() curentTime: string;

  data: Array<any> = [
    {
      currentIndex: 0,
      weight: 3,
      list: [],

      textAlign: 'center',
      className: 'row-group'
    },
    {
      currentIndex: 0,
      weight: 3,
      list: [],

      textAlign: 'center',
      className: 'row-group'
    },
    {
      currentIndex: 0,
      weight: 3,
      list: [],

      textAlign: 'center',
      className: 'item-group'
    }
  ]

  constructor(private activeModal: NgbActiveModal,
    private translate: TranslateService) { }
  listDay = [];
  listYear = [];
  ngOnInit(): void {
    const date = new Date();

    const maxdate = this.daysInMonth(date.getMonth() + 1, date.getFullYear() - 14);
    for (let i = 1; i <= maxdate; i++) {
      if (i.toString().length === 1) {
        this.listDay.push('0' + i);
      } else {
        this.listDay.push(i);
      }
    }
    this.data[0].list = this.listDay;
    this.data[0].currentIndex = Number(this.curentTime.split('/')[0]) - 1;
    this.ngay = this.data[0].currentIndex;

    const listMonth = [];
    for (let i = 1; i <= 12; i++) {
      if (i.toString().length === 1) {
        listMonth.push('0' + i);
      } else {
        listMonth.push(i);
      }
    }
    this.data[1].list = listMonth;
    this.data[1].currentIndex = Number(this.curentTime.split('/')[1]) - 1;
    this.thang = this.data[1].currentIndex;

    for (let i = (date.getFullYear() - 70); i <= date.getFullYear() - 14; i++) {
      this.listYear.push(i);
    }
    this.data[2].list = this.listYear;
    for (let i = 0; i < this.data[2].list.length; i++) {
      if (this.data[2].list[i] === Number(this.curentTime.split('/')[2])) {
        this.data[2].currentIndex = i;
        this.nam = this.data[2].currentIndex;
        break;
      }
    }
  }
  dataChange({ gIndex, iIndex }) {
    if (gIndex === 0) {
      this.ngay = iIndex;
    } else if (gIndex === 1) {
      this.data[0].list = this.listDay;
      this.data[0].currentIndex = Number(this.curentTime.split('/')[0]) - 1;
      this.ngay = this.data[0].currentIndex;
      this.thang = iIndex;
      this.setNumberOfDay();
    } else if (gIndex === 2) {
      this.nam = iIndex;
      this.setNumberOfDay();
    }
  }
  confirm() {
    let ngayName = 0;
    for (let i = 0; i < this.data[0].list.length; i++) {
      if (i === this.ngay) {
        ngayName = this.data[0].list[i];
        break;
      }
    }
    let thangName = 0;
    for (let i = 0; i < this.data[1].list.length; i++) {
      if (i === this.thang) {
        thangName = this.data[1].list[i];
        break;
      }
    }
    let yearName = 0;
    const date = new Date();
    for (let i = 0; i < this.data[2].list.length; i++) {
      if (i === this.nam) {
        yearName = this.data[2].list[i];
        break;
      }
    }
    this.passEntry.emit(ngayName + '/' + thangName + '/' + yearName);
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.dismiss();
  }
  private daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  private setNumberOfDay() {
    this.listDay = [];
    const maxdate = this.daysInMonth(this.thang + 1, this.listYear[this.nam]);
    for (let i = 1; i <= maxdate; i++) {
      if (i.toString().length === 1) {
        this.listDay.push('0' + i);
      } else {
        this.listDay.push(i);
      }
    }
    this.data[0].list = this.listDay;

    const indexDay = this.listDay.map((i, index) => index);
    if (indexDay.indexOf(this.data[0].currentIndex) !== -1) {
      return true;
    }
    else {
      const lastIndex = indexDay[indexDay.length - 1];
      this.data[0].currentIndex = lastIndex;
      this.ngay = this.data[0].currentIndex;
    }
  }
}
