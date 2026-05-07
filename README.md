# ng-base-lib

A modern, reusable Angular UI library built with **Angular 21**, **PrimeNG 21+** (Aura Theme), and **@ngx-translate** for seamless internationalization. 

## Table of Contents
- [How to Deploy & Publish](#how-to-deploy--publish)
- [How to Use in a New Project](#how-to-use-in-a-new-project)

---

## How to Deploy & Publish

Whenever you add new components or make changes to the library, follow these strict steps to publish the updated version to the npm registry.

### 1. Bump the Version
Open the library's specific `package.json` located at `projects/ng-base-lib/package.json` and increase the version number. Note: You cannot overwrite an existing published version.

```
{
  "name": "ng-base-lib",
  "version": "0.0.2"
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
npm install ng-base-lib primeng primeicons @primeng/themes @ngx-translate/core
```
*(Note: If you encounter an `ERESOLVE` zone.js error, update `zone.js` to `~0.16.0` in your `package.json` or append `--legacy-peer-deps` to the install command).*

### Step 2: Configure Global Styles
Your consuming application must provide the CSS framework and fonts. Open `src/styles.scss` (or `styles.css`) and add:

```scss
/* 1. Import Inter Font */
@import url('[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)');

/* 2. Import PrimeIcons */
@import "primeicons/primeicons.css";

/* Apply Global Styling */
body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--surface-ground);
    color: var(--text-color);
}
```

### Step 3: Setup App Providers & Configurations
Open your global `src/app/app.config.ts`. You must configure the HttpClient, PrimeNG Aura Theme, and the custom Translate Loader.

```typescript
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';

// Custom Translation Loader to avoid dependency bugs
@Injectable({ providedIn: 'root' })
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/lang/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    
    // Inject PrimeNG Theme
    providePrimeNG({
        theme: { preset: Aura }
    }),

    // Inject Translations
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: { 
          provide: TranslateLoader, 
          useClass: CustomTranslateLoader 
        }
      })
    )
  ]
};
```

### Step 4: Create Translation Files
Create the internationalization dictionary file inside your application's public assets folder: `public/assets/lang/en.json` (or `src/assets/lang/en.json` depending on your Angular version setup).

```json
{
  "BUTTON": {
    "SUBMIT": "Submit Form"
  },
  "OPTIONAL": "Optional"
}
```

### Step 5: Import and Use Components
In any standalone component where you want to use the library (e.g., `app.component.ts`), simply import the components directly from the library name.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Clean imports thanks to the Barrel pattern!
import { MyButtonComponent, MyInputComponent } from 'ng-base-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, MyButtonComponent, MyInputComponent],
  template: `
    <div style="padding: 2rem;">
      <h1>Welcome to the Application</h1>
      
      <lib-my-button></lib-my-button>
      <lib-my-input></lib-my-input>
    </div>
  `
})
export class AppComponent {}
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
