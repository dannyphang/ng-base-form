import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "../modules/primeng.module";
import { TranslateModule } from "@ngx-translate/core";
import { BaseLabelComponent } from "./label/label.component";
import { BaseButtonComponent } from "./button/button.component";
import { FormArrayComponent } from "./form/form-array.component";
import { FormArrayItemComponent } from "./form/form-array-item.component";
import { BaseFormComponent } from "./form/form.component";
import { FormItemComponent } from "./form/form-item.component";

const components = [
    BaseLabelComponent,
    BaseButtonComponent,
    FormArrayComponent,
    FormArrayItemComponent,
    FormItemComponent,
    BaseFormComponent
]

export const ComponentImports = [
    components,

    PrimeNgModule,
    CommonModule,

    TranslateModule
];