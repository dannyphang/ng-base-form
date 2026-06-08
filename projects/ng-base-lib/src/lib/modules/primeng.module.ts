import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from "primeng/checkbox";
import { TooltipModule } from "primeng/tooltip";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TextareaModule } from 'primeng/textarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

const PRIMENG_MODULES: any[] = [
    ButtonModule,
    TooltipModule,
    CheckboxModule,
    ToggleSwitchModule,
    SelectModule,
    ProgressSpinnerModule,
    InputNumberModule,
    InputTextModule,
    ChipModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    RadioButtonModule,
    MessageModule,
    ToastModule,
    DatePickerModule,
    BreadcrumbModule,
    TextareaModule,
    AutoCompleteModule,
    InputGroupModule,
    InputGroupAddonModule
]

@NgModule({
    imports: [
        PRIMENG_MODULES
    ],
    exports: [
        PRIMENG_MODULES
    ],
    providers: [
        // PrimeNGMessage,
        // TerminalService,
    ]
})

export class PrimeNgModule { }