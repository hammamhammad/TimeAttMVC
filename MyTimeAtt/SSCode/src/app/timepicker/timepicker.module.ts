import { TimePicker } from './timepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TimePicker],
    exports: [TimePicker]
})
export class TimepickerModule { }