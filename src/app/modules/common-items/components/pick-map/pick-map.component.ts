import {Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pick-map',
  templateUrl: './pick-map.component.html',
  styleUrls: ['./pick-map.component.scss']
})
export class PickMapComponent implements OnInit, OnDestroy {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() showButton: boolean;
  mapClickListener: any;
  map: any;
  @Output() next = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  private subscriptions: Subscription[] = [];

  constructor(
      private router: Router,
      private translateService: TranslateService,
      private modal: NgbModal,
      // public modal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    if (this.latitude === undefined || this.latitude === null || this.longitude === undefined || this.longitude === null) {
      this.getLocation();
    }
  }

  // test
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }
      }, (error) => {
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  // mapClicked($event: google.maps.MouseEvent) {
  // this.markers.push({
  //   lat: $event.latLng.lat(),
  //   lng: $event.latLng.lng(),
  //   draggable: true
  // });
  // }

  public mapReadyHandler(map: google.maps.Map) {
    this.map = map;
    this.mapClickListener = map.addListener('click', (e: google.maps.MouseEvent) => {
      this.latitude = e.latLng.lat();
      this.longitude = e.latLng.lng();
      map.setCenter(e.latLng);

    });
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.map.setCenter($event.latLng);
  }

  // end test

  handleCancel() {
    this.cancel.emit(true);
  }

  handleNext() {
    this.next.emit({latitude: this.latitude, longitude: this.longitude});
    this.cancel.emit(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

}
