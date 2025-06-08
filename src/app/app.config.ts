import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptorProviders } from './services/auth.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(
      NgxUiLoaderModule,
      NgxUiLoaderHttpModule.forRoot({ showForeground: true })
    ), 
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), authInterceptorProviders, provideHttpClient(withInterceptorsFromDi())
  ]
};
