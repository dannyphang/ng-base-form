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
    InputIconModule
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