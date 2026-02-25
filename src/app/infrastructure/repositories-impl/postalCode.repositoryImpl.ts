import { inject, Injectable } from '@angular/core';
import { PostalCodeRepository } from '../../domain/repositories/postalCode.repository';
import { map, Observable } from 'rxjs';
import { PostalCode } from '../../domain/entities/postalCode.entity';
import { PostalCodeDatasource } from '../datasources/postalCode.datasource';
import { PostalCodeMapper } from '../mappers/postalCode.mapper';

@Injectable()
export class PostalCodeRepositoryImpl implements PostalCodeRepository {
  datasourcePostalCode = inject(PostalCodeDatasource);

  getUbicationByPostalCode(postalCode: number): Observable<PostalCode | null> {
    return this.datasourcePostalCode
      .getUbicationByPostalCode(postalCode)
      .pipe(map((response) => PostalCodeMapper.fromApiPostalCode(response)));
  }
}
