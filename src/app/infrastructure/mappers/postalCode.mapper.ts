import { PostalCode } from '../../domain/entities/postalCode.entity';

export class PostalCodeMapper {
  static fromApiPostalCode(ubicacion: any): PostalCode | null {
    if (!ubicacion.postalcodes || ubicacion.postalcodes.length === 0) {
      return null;
    }
    return {
      lng: ubicacion.postalcodes[0].lng,
      countryCode: ubicacion.postalcodes[0].countryCode,
      postalcode: ubicacion.postalcodes[0].postalcode,
      adminName1: ubicacion.postalcodes[0].adminName1,
      placeName: ubicacion.postalcodes[0].placeName,
      lat: ubicacion.postalcodes[0].lat,
    };
  }
}
