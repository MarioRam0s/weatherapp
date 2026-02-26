import { Observable } from 'rxjs';
import { PostalCode } from '../entities/postalCode.entity';

export abstract class PostalCodeRepository {
  abstract getUbicationByPostalCode(postalCode: number): Observable<PostalCode | null>;
}
