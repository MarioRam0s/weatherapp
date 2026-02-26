import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostalCode } from '../../domain/entities/postalCode.entity';
import { PostalCodeRepository } from '../../domain/repositories/postalCode.repository';

@Injectable({ providedIn: 'root' })
export class PostalCodeUseCase {
  postalCodeRepository = inject(PostalCodeRepository);

  getUbicationByPostalCode(postalCode: number): Observable<PostalCode | null> {
    return this.postalCodeRepository.getUbicationByPostalCode(postalCode);
  }
}
