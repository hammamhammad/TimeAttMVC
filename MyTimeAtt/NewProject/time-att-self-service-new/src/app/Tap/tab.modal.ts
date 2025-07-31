import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTabset, NgbTab, NgbTabContent, NgbTabTitle, NgbTabChangeEvent, TabAutofocusDirective } from './tab.component';
import { NgbTabsetConfig } from './tab-config';

export { NgbTabset, NgbTab, NgbTabContent, NgbTabTitle, NgbTabChangeEvent, TabAutofocusDirective } from './tab.component';
export { NgbTabsetConfig } from './tab-config';

const NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle, TabAutofocusDirective];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule] })
export class NgbTabsetModule {
  static forRoot(): ModuleWithProviders<NgbTabsetModule> { return { ngModule: NgbTabsetModule, providers: [NgbTabsetConfig] }; }
}