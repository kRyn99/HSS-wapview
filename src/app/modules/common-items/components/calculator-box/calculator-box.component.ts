import { formatNumber } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculator-box',
  templateUrl: './calculator-box.component.html',
  styleUrls: ['./calculator-box.component.scss']
})
export class CalculatorBoxComponent implements OnInit {
  @Input() input = '';
  result = '';
  @Output() equal = new EventEmitter<any>();

  constructor(
      public modal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  handleClose() {
    this.modal.close();
  }

  pressNum(num: string) {
    //remove separate ',' character
    this.input = this.input.replace(/[^0-9+\-*\/\.]/g, '');

    // Do Not Allow . more than once
    if (num === '.') {
      if (this.input !== '') {

        const lastNum = this.getLastOperand()
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    // Do Not Allow 0 at beginning.
    // Javascript will throw Octal literals are not allowed in strict mode.
    if (num === '0') {
      if (this.input === '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    this.input = this.input + num;
    // this.calcAnswer();

    //add separate ',' character again
    let operandArr = this.input.split(/[+\-*\/]/);
    let operatorArr = this.input.replace(/[0-9\.]/g, '').split('');
    let formattedStr = '';
    for(let i = 0; i < operandArr.length; i++){
      formattedStr += formatNumber(+operandArr[i], 'en-US', '1.0');
      if(i < operatorArr.length){
        formattedStr += operatorArr[i];
      }
    }
    this.input = formattedStr;
  }


  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf('+')
    if (this.input.toString().lastIndexOf('-') > pos) pos = this.input.lastIndexOf('-')
    if (this.input.toString().lastIndexOf('*') > pos) pos = this.input.lastIndexOf('*')
    if (this.input.toString().lastIndexOf('/') > pos) pos = this.input.lastIndexOf('/')
    return this.input.substr(pos + 1)
  }


  pressOperator(op: string) {

    // Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }

    this.input = this.input + op
    // this.calcAnswer();
  }


  clear() {
    if (this.input !== '') {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    this.result = eval(formula.replace(/,/g, ''));
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input === '0') this.input = '';
    // close
    this.equal.emit(this.result);
    this.modal.close();
  }

}
