# ng-base-lib

A modern, dynamic, and reusable Angular UI library built with **Angular 21**, **PrimeNG 21+** (Aura Theme), and **@ngx-translate** for seamless internationalization.

## Table of Contents

- [How to Deploy & Publish](#how-to-deploy--publish)
- [How to Use in a New Project](#how-to-use-in-a-new-project)

---

## How to Deploy & Publish

Whenever you add new components or make changes to the library, follow these strict steps to publish the updated version to the npm registry.

### 1. Bump the Version

Open the library's specific `package.json` located at `projects/ng-base-lib/package.json` and increase the version number. Note: You cannot overwrite an existing published version.

```json
{
  "name": "ng-base-lib",
  "version": "0.0.3"
}
```

### 2. Build the Library

From the root of your workspace, run the Angular build command to compile the library into the `dist` folder.

```bash
ng build ng-base-lib
```

### 3. Navigate to the Distribution Folder (Crucial!)

**Do not publish from the root folder!** You must navigate into the compiled `dist` directory.

```bash
cd dist/ng-base-lib
```

### 4. Authenticate with npm

If you are not already logged in, authenticate via the terminal. You will need your npmjs.com username, password, and email.

```bash
npm login
```

### 5. Publish to npm

Publish the package. If your npm account has Two-Factor Authentication (2FA) enabled, you must append the `--otp` flag with your 6-digit authenticator code.

```bash
npm publish --otp=123456
```

---

## How to Use in a New Project

Follow these steps to seamlessly integrate `ng-base-lib` into a modern Angular Standalone application.

### Step 1: Install Dependencies

Navigate to your new application's root directory and install the library along with its required peer dependencies.

```bash
npm install ng-base-lib primeng primeicons @primeng/themes @ngx-translate/core @angular/animations
```

### Step 2: Configure Global Styles

Your consuming application must provide the CSS framework and fonts. Open `src/styles.scss` (or `styles.css`) and add:

```scss
/* 1. Import Tailwind (Optional but recommended) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. Import PrimeIcons */
@import 'primeicons/primeicons.css';

/* Apply Global Styling */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--surface-ground);
  color: var(--text-color);
}
```

_(Pro-Tip: Load the 'Inter' Google Font directly in your `index.html` head for faster page loads)._

### Step 3: Create the UI Component Dictionary (`app-providers.ts`)

Because `ng-base-lib` generates forms dynamically from JSON, you must map the `CONTROL_TYPE` enums to actual Component classes so Angular knows exactly what to render.

Create a file named `src/app/app-providers.ts` and add this mapping:

```typescript
import {
  CONTROL_TYPE,
  BASE_UI_TOKEN,
  FORM_ARRAY_TOKEN,
  BaseInputComponent,
  BaseButtonComponent,
  FormArrayComponent,
  FormArrayItemComponent,
  // Import other components as you need them (e.g., BaseDropdownComponent)
} from 'ng-base-lib';

// 1. Map standard form controls
export const allBaseUIForm = {
  [CONTROL_TYPE.Textbox]: BaseInputComponent,
  [CONTROL_TYPE.Button]: BaseButtonComponent,
};

export const appProviders = [
  // 2. Provide the main UI Dictionary
  { provide: BASE_UI_TOKEN, useValue: allBaseUIForm },

  // 3. Provide the Form Array Dictionary
  {
    provide: FORM_ARRAY_TOKEN,
    useValue: {
      [CONTROL_TYPE.FormArray]: FormArrayComponent,
      arrayItem: FormArrayItemComponent,
    },
  },
];
```

### Step 4: Setup App Configurations (`app.config.ts`)

Open your global `src/app/app.config.ts`. You must configure the HttpClient, PrimeNG Aura Theme, the custom Translate Loader, and inject the UI Dictionary you just created.

```typescript
import { ApplicationConfig, importProvidersFrom, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { appProviders } from './app-providers'; // <-- Import your custom dictionary

// Custom Translation Loader to avoid dependency bugs
@Injectable({ providedIn: 'root' })
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),

    // Inject PrimeNG Theme
    providePrimeNG({
      theme: { preset: Aura },
    }),

    // Inject Translations
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'en', // Use fallbackLang instead of defaultLanguage
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader,
        },
      }),
    ),

    // Inject Library Component Dictionary (Crucial for Dynamic Forms!)
    ...appProviders,
  ],
};
```

### Step 5: Create Translation Files

Create the internationalization dictionary file inside your application's public assets folder: `public/assets/i18n/en.json` (or `src/assets/i18n/en.json`).

```json
{
  "BUTTON": {
    "SUBMIT": "Submit Form"
  },
  "OPTIONAL": "Optional"
}
```

### Step 6: Import and Use Components

In any standalone component where you want to use the library (e.g., `app.component.ts`), import the components directly from the library name.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Clean imports thanks to the Barrel pattern!
import { FormItemComponent } from 'ng-base-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormItemComponent],
  template: `
    <div class="tw-p-8">
      <h1>Welcome to the Application</h1>

      <!-- Using ng-base-lib components -->
      <app-form-item [fieldConfig]="myConfig"></app-form-item>
    </div>
  `,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en'); // Force language load on startup
  }
}
```

## Testing Configuration

If you run unit tests (`ng test`) in the consuming application, ensure you add `TranslateModule.forRoot()` to your `TestBed` imports in the `.spec.ts` files to prevent injection errors.

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [AppComponent, TranslateModule.forRoot()],
  }).compileComponents();
});
```
