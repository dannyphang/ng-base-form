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

const components = [
    BaseLabelComponent,
    BaseButtonComponent,
    FormArrayComponent,
    FormArrayItemComponent,
    FormItemComponent,
    BaseFormComponent,
    BaseCheckboxComponent,
    BaseDropdownComponent
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