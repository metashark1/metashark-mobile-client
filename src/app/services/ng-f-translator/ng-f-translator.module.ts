import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgFerhadoTranslatorPipe } from './ng-f-translator.pipe';
export interface NgFerhadoTranslatorConfig {
  defaultLang?: string,
  storagePrefix?: string
}

@NgModule({
  declarations: [NgFerhadoTranslatorPipe],
  exports: [NgFerhadoTranslatorPipe]
})

export class NgFTranslatorModule {
  public static forRoot(config: NgFerhadoTranslatorConfig): ModuleWithProviders {
    return {
      ngModule: NgFTranslatorModule,
      providers: [
        { provide: 'config', useValue: config }
      ]
    };
  }
}
