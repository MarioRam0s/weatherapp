import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostalCode } from '../../domain/entities/postalCode.entity';
import { environment } from '../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class PostalCodeDatasource {
  http: HttpClient = inject(HttpClient);

  getUbicationByPostalCode(postalCode: number): Observable<PostalCode | null> {
    // PRODUCCIÓN (Netlify)
    if (environment.production) {
      return this.http.get<PostalCode>(`${environment.apiUrl}?postalcode=${postalCode}`);
    }

    // DESARROLLO
    return this.http.get<PostalCode>(
      `${environment.apiUrl}/postalCodeLookupJSON?postalcode=${postalCode}&country=US&username=lorddev`,
    );
  }
}
