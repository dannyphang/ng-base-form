import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "../modules/primeng.module";
import { TranslateModule } from "@ngx-translate/core";
import { BaseLabelComponent } from "./label/label.component";
import { BaseButtonComponent } from "./button/button.component";
import { FormArrayComponent } from "./form/form-array.component";
import { FormArrayItemComponent } from "./form/form-array-item.component";
import { BaseFormComponent } from "./form/form.component";
import { FormItemComponent } from "./form/form-item.component";
import { BaseCheckboxComponent } from "./checkbox/checkbox.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseDropdownComponent } from "./dropdown/dropdown.component";
import { OnlyNumberDirective } from "../util/directives/only-number.directive";
import { PasswordDirective } from "primeng/password";
import { ChipComponent } from "./chip/chip.component";
import { BaseRadioComponent } from "./radio/radio.component";
import { ToastComponent } from "./toast/toast.component";
import { TextareaModule } from 'primeng/textarea';
import { BaseDatepickerComponent } from "./datepicker/datepicker.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { BaseTextareaComponent } from "./textarea/textarea.component";
import { AutoFocusModule } from 'primeng/autofocus';
import { BaseSwitchComponent } from "./input-switch/input-switch.component";

const components = [
    BaseLabelComponent,
    BaseButtonComponent,
    FormArrayComponent,
    FormArrayItemComponent,
    FormItemComponent,
    BaseFormComponent,
    BaseCheckboxComponent,
    BaseDropdownComponent,
    ChipComponent,
    BaseRadioComponent,
    ToastComponent,
    BaseTextareaComponent,
    BaseDatepickerComponent,
    BreadcrumbComponent,
    AutoFocusModule,
    BaseSwitchComponent
]

export const ComponentImports = [
    components,

    PrimeNgModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    OnlyNumberDirective,
    PasswordDirective
];