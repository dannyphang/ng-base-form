import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from "primeng/tooltip";

const PRIMENG_MODULES: any[] = [
    ButtonModule,
    TooltipModule,
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