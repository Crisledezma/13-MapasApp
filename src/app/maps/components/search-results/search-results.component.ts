import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places.interface';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(
    public placesService: PlacesService,
    public mapService: MapService
  ) {}

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    if (!this.placesService.userLocation) throw Error('No hay userLocation');
    this.placesService.deletePlaces();
    const start = this.placesService.userLocation;
    const end = place.center as [number,number];
    this.mapService.getRouteBetweenTwoPoints(start, end)
  }

}
