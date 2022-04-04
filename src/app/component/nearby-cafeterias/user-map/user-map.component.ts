import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {

  @Input()
  location!: string;

  constructor() { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Location is not supported');
      this.location = "";
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(
        `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
      );
      this.location = position.coords.latitude + "," + position.coords.longitude;
    });
  }

    // watchPosition() {
  //   let id = navigator.geolocation.watchPosition( (position) => {
  //     console.log(
  //       `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
  //     );
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }

}
