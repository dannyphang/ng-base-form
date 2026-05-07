import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

// 2. Import the UI components and tokens FROM YOUR LIBRARY!
import {
    CONTROL_TYPE,
    BASE_UI_TOKEN,
    FORM_ARRAY_TOKEN,
    BaseButtonComponent,
    BaseInputComponent,
} from 'ng-base-lib';

export const appProviders = [
    // 3. Provide the UI components and tokens to Angular's dependency injection system
    { provide: BASE_UI_TOKEN, useValue: CONTROL_TYPE },
    { provide: FORM_ARRAY_TOKEN, useValue: CONTROL_TYPE.FormArray },
    BaseButtonComponent,
    BaseInputComponent,

    // 4. Provide any additional services or configurations needed for your app
    provideAnimationsAsync(),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MessageService,
];