import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { CoffeeShopsListComponent } from 'src/app/coffee-shops-list/coffee-shops-list.component';

@Component({
  selector: 'app-unmutable-map',
  templateUrl: './unmutable-map.component.html',
  styleUrls: ['./unmutable-map.component.css']
})
export class UnmutableMapComponent implements OnInit {

  public map!: ymaps.Map;

  public lat: number = 59.9386;
  public lng: number = 30.3141;

  @Input()
  location!: string;

  

  @Input()
  editable!: boolean;

  @Input()
  name!: string;
  
  constructor() { }

  ngOnInit(): void {
    console.log("Unmutable map component init. Editable: ", this.editable, ". Name: ", this.name);
  }

  ngOnChanges() {
    console.log("Unmutable map component reinit. Editable: ", this.editable, ". Name: ", this.name);
    if (this.location) {
      console.log(this.location);
      this.lat = Number(this.location.split(',')[0]);
      this.lng = Number(this.location.split(',')[1]);
      console.log(this.lat, this.lng);
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    console.log("Unmutable map component ready. Editable: ", this.editable, ". Name: ", this.name);

    this.map = event.target;
    
    // console.log(this.location);
    // this.lat = Number(this.location.split(',')[0]);
    // this.lng = Number(this.location.split(',')[1]);
    // console.log(this.lat, this.lng);
    
  }

}
