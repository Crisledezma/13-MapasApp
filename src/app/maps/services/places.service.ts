import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, Places } from '../interfaces/places.interface';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService,
  ) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => { 
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation); 
        },
        (err) => {
          alert(err);
          console.log(err);
          reject();
        }
      )
    } )
  }

  getPlacesByQuery(query: string) {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if(!this.userLocation) throw Error('No hay userLocation')
    this.isLoadingPlaces = true;
    return this.placesApi.get<Places>(`${query}.json`, {
      params: {
        proximity: this.userLocation?.join(','),
      }
    })
    .subscribe(resp => {
      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapService.createMarkerFromPlaces(this.places, this.userLocation!);
      })
  }

  deletePlaces() {
    this.places = [];
  }
}
