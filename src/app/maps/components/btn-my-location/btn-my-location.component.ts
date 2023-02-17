import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { PlacesService } from '../../services';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ){}

  goToMyLocation() {
    if (!this.placesService.isUserLocationReady) throw Error('No hay ubicación de usuario');
    if (!this.mapService.isMapReady) throw Error('No hay mapa disponible');
    this.mapService.flyTo( this.placesService.userLocation! )
  }

}
