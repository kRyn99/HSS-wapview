import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  ideaName2= new BehaviorSubject<any>(null);
  // selectedStartDateEdit : Date;
  ideaDTO = new BehaviorSubject<any>(null);
  ideaDTOEdit = new BehaviorSubject<any>(null);
  public lstContributorDTO= new BehaviorSubject<any>(null);
  selectedUnitValue: BehaviorSubject<any> = new BehaviorSubject([]);
  selectedUnitValueEdit: BehaviorSubject<any> = new BehaviorSubject([]);
  selectedSpecialtyValue= new BehaviorSubject<any>(null);
  selectedSpecialtyValueEdit= new BehaviorSubject<any>(null);
  selectedStartDate= new BehaviorSubject<Date>(null);
  selectedEndDate=new BehaviorSubject<Date>(null);
  beforeApplyStatus= new BehaviorSubject<any>(null);
  content= new BehaviorSubject<any>(null);
  applyRange= new BehaviorSubject<any>(null);
  effectiveness= new BehaviorSubject<any>(null);
  nextStep= new BehaviorSubject<any>(null);
  note= new BehaviorSubject<any>(null);
  percentage= new BehaviorSubject<any>(null);
  percentageOut= new BehaviorSubject<any>(null);
  email= new BehaviorSubject<any>(null);
  phoneNumber= new BehaviorSubject<any>(null);
  birthday= new BehaviorSubject<any>(null);
  public file: BehaviorSubject<any> = new BehaviorSubject({
    url: '',
    name: '',
  });


  // // list=new BehaviorSubject<{}>({});
  selectedItems: any[] = [];
  editContributorIn: any[] = [];
  showDropdown = false;
  showDropdownEdit = false;
  backFromEdit=false;
  lstContributorDTOService = new BehaviorSubject<any>([]);
  lstContributorDTOServiceOut = new BehaviorSubject<any>([]);
  lstContributorDTOServiceEdit = new BehaviorSubject<any>([]);
  lstContributorDTOServiceOutEdit = new BehaviorSubject<any>([]);
  contributorOut = new BehaviorSubject<any>([]);

  listIdeaService: any[] = [];
  listUnitService: any[] = [];
  listUnitService2 = new BehaviorSubject<any>(null);
  updatedListUnitDTO = new BehaviorSubject<any>(null);
  listContrivanceService: any[] = [];
  // public selectedStaffCodeSubject = new BehaviorSubject<any>(null);
  // setSelectedStaffCode(code: any) {
  //   this.selectedStaffCodeSubject.next(code);
  // }

  // getSelectedStaffCodeSubject() {
  //   return this.selectedStaffCodeSubject.asObservable();
  // }
  public isFromAdd: boolean = false;

  setFromAdd(value: boolean) {
    this.isFromAdd = value;
  }

  getFromAdd(): boolean {
    return this.isFromAdd;
  }

  public selectedUnit = new BehaviorSubject<any>(null);
  setselectedUnit(code: any) {
    this.selectedUnit.next(code);
  }

  getselectedUnit() {
    return this.selectedUnit.asObservable();
  }

 
  messageSource = new BehaviorSubject<any>('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message);
  }

  // public selectedItems: Map<number, boolean> = new Map<number, boolean>();

  // getItemSelection(itemId: number): boolean | undefined {
  //   return this.selectedItems.get(itemId);
  // }

  // setItemSelection(itemId: number, selected: boolean): void {
  //   this.selectedItems.set(itemId, selected);
  // }
  public selectedStaffCodeSubject = new BehaviorSubject<any>(null);
}