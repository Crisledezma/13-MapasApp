import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl'
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {
  @ViewChild('MapDiv') mapDivElement!: ElementRef

  constructor(
    private mapService   : MapService,
    private placesService: PlacesService,
  ){}

  ngOnInit(): void {
    console.log(this.placesService.userLocation);
  }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) {
      throw Error("No hay placesService.userLocation");      
    }
    var map = new Map({
      container: this.mapDivElement.nativeElement,
      center: this.placesService.userLocation,
      zoom: 18,
      style: 'mapbox://styles/mapbox/streets-v11'
    });
    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);
    this.mapService.setMap(map);
  }


}
