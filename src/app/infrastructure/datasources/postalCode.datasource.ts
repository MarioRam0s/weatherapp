import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostalCode } from '../../domain/entities/postalCode.entity';

@Injectable({ providedIn: 'root' })
export class PostalCodeDatasource {
  http: HttpClient = inject(HttpClient);

  getUbicationByPostalCode(postalCode: number): Observable<PostalCode | null> {
    return this.http.get<PostalCode>(
      `https://api.geonames.org/postalCodeLookupJSON?postalcode=${postalCode}&country=US&username=lorddev`,
    );
  }
}
