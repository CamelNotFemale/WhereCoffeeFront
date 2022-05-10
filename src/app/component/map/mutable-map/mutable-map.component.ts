import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-mutable-map',
  templateUrl: './mutable-map.component.html',
  styleUrls: ['./mutable-map.component.css']
})
export class MutableMapComponent implements OnInit {

  public map!: ymaps.Map;

  public lat: number = 59.9386;
  public lng: number = 30.3141;

  @Input()
  location!: string

  @Output()
  locationChange = new EventEmitter<string>();

  @Input()
  editable!: boolean;

  @Input()
  name!: string;

  constructor() { }

  ngOnInit(): void {
    console.log("Mutable map component init. Editable: ", this.editable, ". Name: ", this.name);
  }

  ngOnChanges() {
    console.log("Mutable map component reinit. Editable: ", this.editable, ". Name: ", this.name);
    if (this.location) {
      console.log(this.location);
      this.lat = Number(this.location.split(',')[0]);
      this.lng = Number(this.location.split(',')[1]);
      console.log(this.lat, this.lng);
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    console.log("Mutable map component ready. Editable: ", this.editable, ". Name: ", this.name);

    this.map = event.target;
    
    
      this.map.events.add('click', (e: ymaps.IEvent<MouseEvent, {}>) => {
        var coords = e.get('coords');
        var coordinatesString = coords.join(',');
        this.location = coordinatesString;
        this.locationChange.emit(this.location);
        this.lat = coords[0];
        this.lng = coords[1];
        console.log(coordinatesString);
      })
  }

}
