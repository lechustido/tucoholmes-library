import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IesacommonAngularRestModule } from 'iesa-common-angular-rest';
import { provideToastr } from 'ngx-toastr';
import { ENVIRONMENT, IesaTcCommonAngularInterceptorService } from 'iesa-tc-common-angular-interceptor-17';
import { TucoholmesInterceptorHttp } from '../../projects/tucoholmes-library/src/lib/tucoholmes-interceptor.service.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([IesaTcCommonAngularInterceptorService, TucoholmesInterceptorHttp])),
    importProvidersFrom(
      IesacommonAngularRestModule.forRoot(environment, HttpClient)
    ),
    provideToastr(),
    { provide: ENVIRONMENT, useValue: environment },
  ],
};
