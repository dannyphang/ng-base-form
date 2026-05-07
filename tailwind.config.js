/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-', // Your custom prefix to protect PrimeNG!
  content: [
    "./src/**/*.{html,ts}",                  
    "./projects/ng-base-lib/**/*.{html,ts}"  , 
    "./node_modules/ng-base-lib/**/*.{html,ts,js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}