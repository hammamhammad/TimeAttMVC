import { NgModule, ModuleWithProviders } from '@angular/core';
import { APIRestFulService } from './apiRestful.service';
import { TranslatePipe } from './TranslatePipe';
import { TranslateService } from './TranslateService';
import { TranslateLoader } from './TranslateLoader';
export * from './TranslatePipe';
export * from './TranslateService';
export * from './TranslateLoader';

// for angular-cli
export default {
  pipes: [TranslatePipe],
  providers: [TranslateService]
};

export function translateLoaderFactory(http: APIRestFulService) {
  return new TranslateLoader(http);
}

@NgModule({
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ]
})
export class TranslateModule {

  static forRoot(
    providedLoader: any = {
      provide: TranslateLoader,
      useFactory: translateLoaderFactory,
      deps: [APIRestFulService]
    }
  ): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [TranslateService
        , providedLoader
      ]
    };
  }
}
