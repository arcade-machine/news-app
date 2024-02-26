import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from "@ngxs/store";
import { NewsState } from "./state/news.state";
import { NewsHttpService } from "./services/news-http.service";
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    NewsHttpService,
    importProvidersFrom(NgxsModule.forRoot([NewsState])),
  ]
};
