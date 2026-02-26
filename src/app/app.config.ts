import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { PostalCodeRepository } from './domain/repositories/postalCode.repository';
import { PostalCodeRepositoryImpl } from './infrastructure/repositories-impl/postalCode.repositoryImpl';
import { WeatherRepository } from './domain/repositories/weather.repository';
import { WeatherRepositoryImpl } from './infrastructure/repositories-impl/weather.repositoryImpl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: PostalCodeRepository, useClass: PostalCodeRepositoryImpl },
    { provide: WeatherRepository, useClass: WeatherRepositoryImpl },
  ],
};
