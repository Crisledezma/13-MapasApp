import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {
  public baseUrl: string = environment.drivingBaseUrl;

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(url: string) {
    url = this.baseUrl + url;
    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: environment.ApiKEy,
      }
    });
  }
} 