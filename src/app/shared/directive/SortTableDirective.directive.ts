import {
    Directive, ElementRef, HostListener, Renderer2,
    Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, DoCheck, OnChanges
} from '@angular/core';
const IDENTITYID = '22220S192248';
const ISSORTFIELD = 'isSortField';
const FIELDSORTNAME = 'fieldSortName';
@Directive({
    selector: '[appSortTable]'
})
export class SortTableDirective implements AfterViewInit, AfterViewChecked, OnChanges {
    constructor(private elRef: ElementRef, private renderer: Renderer2) {
        this.elementR = elRef;
        this.renderElement = renderer;
        this.sortFieldListName = {};
        this.listDataSort = [];
    }
    private elementR: ElementRef;
    private renderElement: Renderer2;
    @Input('appSortTable') private listData: any[];
    @Output() private returnData: EventEmitter<any> = new EventEmitter();
    private sortFieldListName: any;
    private listDataSort: any[];
    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        // change when close modal, reset to default;
        if (this.dataIsValid(changes.listData) && this.dataIsValid(changes.listData.currentValue) && this.listDataSort.length > 0) {
            Object.keys(this.sortFieldListName).map(v => this.sortFieldListName[v] = '');
        }
        const th = this.elementR.nativeElement.querySelectorAll('th');
        this.elementR.nativeElement.scrollTop = 0;
        this.elementR.nativeElement.scrollLeft = 0;

        if (this.dataIsValid(th)) {
            for (const ele of th) {
                this.sortFieldListName[ele.getAttribute(FIELDSORTNAME)] = '';
                const childr = ele.querySelector('i');
                if (childr != null) {
                    childr.style.display = 'none';
                }
            }
        }
    }
    ngAfterViewChecked() {
        if (this.listData && this.listData.length > 0 && this.listDataSort.length === 0) {
            this.elementR.nativeElement.scrollTop = 0;
            this.elementR.nativeElement.scrollLeft = 0;
            this.listDataSort = this.listData;
            // sort field on first time
            this.filterSortField();
        }
    }
    ngAfterViewInit() {
        const th = this.elementR.nativeElement.querySelectorAll('th');
        if (this.dataIsValid(th) && th.length > 0) {
            for (const ele of th) {
                const getAttr = ele.getAttribute(ISSORTFIELD);
                if (this.dataIsValid(getAttr) && getAttr === 'true') {
                    this.sortFieldListName[ele.getAttribute(FIELDSORTNAME)] = '';
                }
            }
        }
    }
    /**
     * @param event on event
     */
    @HostListener('click', ['$event']) clickSortField = (event: any): void => {
        // event.preventDefault();
        // event.stopPropagation();
        let evt = event.target;
        if (evt.tagName === 'I' && evt.parentNode.tagName === 'TH') {
            evt = event.target.parentNode;
        }
        const getFieldNameSort = evt.getAttribute(FIELDSORTNAME);
        if (evt.tagName === 'TH' && this.dataIsValid(getFieldNameSort) && this.dataIsValid(this.sortFieldListName[getFieldNameSort])) {
            this.listDataSort = this.listData && this.listData.length > 0 ? this.listData : this.listDataSort;
            const creatId = `${getFieldNameSort}${IDENTITYID}`;
            const element = this.elementR.nativeElement.querySelector(`[id="${creatId}"]`);
            const th = this.elementR.nativeElement.querySelectorAll('th');
            for (const ele of th) {
                this.sortFieldListName[ele.getAttribute(FIELDSORTNAME)] = '';
                const childr = ele.querySelector('i');
                if (childr && childr.id !== creatId) {
                    childr.style.display = 'none';
                }
            }
            if (!this.dataIsValid(element)) {
                const child = document.createElement('i');
                child.id = creatId;
                child.className = 'fa fa-angle-up';
                child.style.cssText = 'float:right';
                this.renderElement.appendChild(evt, child);
                this.sortFieldListName[getFieldNameSort] = 'asc';
            } else {
                if (element.style.display === 'none' || element.className === 'fa fa-angle-down') {
                    element.style.display = 'block';
                    element.className = 'fa fa-angle-up';
                    this.sortFieldListName[getFieldNameSort] = 'asc';
                } else {
                    element.className = 'fa fa-angle-down';
                    this.sortFieldListName[getFieldNameSort] = 'desc';
                }
            }
            this.filterSortField();
        }
    }
    /**
     * get field will sort and sort list data by field sort
     */
    filterSortField = (): void => {
        let fieldSort;
        Object.keys(this.sortFieldListName).map(v => {
            if (this.sortFieldListName[v] !== '') {
                fieldSort = { field: v, type: this.sortFieldListName[v] };
            }
        });
        // @ts-ignore
        if (this.listData && this.listData !== [] && typeof fieldSort === 'object') {
            this.elementR.nativeElement.scrollTop = 0;
            this.elementR.nativeElement.scrollLeft = 0;
            this.sortedByField(fieldSort);
        }
    }
    /**
     * @param fieldSort sort by field name
     */
    sortedByField = (fieldSort): void => {
        // sort here
        this.listDataSort = this.listDataSort.sort((a, b) => this.sortOrderByField(a[fieldSort.field], b[fieldSort.field], fieldSort.type));
        this.returnData.emit(this.listDataSort);
    }
    /**
     * @param data check data is valid (not nut or not undefined)
     */
    dataIsValid = (data): boolean => data !== undefined && data != null;

    checkNumber = (num): boolean => this.dataIsValid(num) && /^-?\d+(?:\.\d+)?$/.test(num.toString());

    private sortOrderByField = (a, b, asc) => {
        if (this.dataIsValid(a) && this.dataIsValid(b) && a !== b) {
            // sort by number
            if (this.checkNumber(a) && this.checkNumber(b)) {
                return asc === 'asc' ? parseInt(a, 10) - parseInt(b, 10) : parseInt(b, 10) - parseInt(a, 10);
            }
            // sort by date value
            if (Date.parse(a) && Date.parse(b)) {
                return asc === 'asc' ? new Date(a).getTime() - new Date(b).getTime()
                    : new Date(b).getTime() - new Date(a).getTime();
            }
            // sort by string
            if (typeof a === 'string' && typeof b === 'string') {
                return asc === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
            }
        } else {
            return !this.dataIsValid(a) ? 1 : (!this.dataIsValid(b) ? -1 : 0);
            // return !this.dataIsValid(a) ? (asc === 'asc' ? 1 : -1) : (!this.dataIsValid(b) ? (asc === 'asc' ? 1 : -1) : 0);
        }
    }
}
