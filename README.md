# LinkGuru PWA

PWA shell for Himpunan Pautan Digital, hosted with GitHub Pages.

Repository: `smadjiwa/linkguru`
Public URL: `https://smadjiwa.github.io/linkguru/`

## Publish on GitHub Pages
Repository Settings > Pages > Build and deployment:
- Source: Deploy from a branch
- Branch: main
- Folder: /(root)

## Files
- index.html — PWA home page
- manifest.webmanifest — PWA installation metadata
- sw.js — offline shell cache
- icon-192.png / icon-512.png / icon.svg — application icons
- Code_GS_API_Required.gs — GAS backend code with a JSONP public read endpoint

## REQUIRED Google Apps Script update
GitHub Pages cannot call `google.script.run` because that API exists only inside GAS HTML Service. This PWA calls GAS via JSONP at:
`https://script.google.com/a/macros/moe-dl.edu.my/s/DEPLOYMENT_ID/exec?action=home&callback=linkGuruCallback`

The supplied `Code_GS_API_Required.gs` adds that endpoint and the admin functions used by the existing Admin.html. Replace the Code.gs in the existing GAS project with this version, keep the HTML file named `Admin`, then Deploy > Manage deployments > Edit > New version.

Check that the web app is deployed to execute as the owner and is accessible to the intended audience. Test the endpoint in a browser:
`.../exec?action=home&callback=testCallback`
The response must be JavaScript beginning `testCallback({` and contain the `pautan` and `identiti` properties.

## Admin
The footer Admin link opens the existing GAS-hosted admin page at `?page=admin`. The PIN is read from the `AdminPin` sheet, column header `Pin`. `Pautan` and `Tetapan` are public display data; do not put confidential information in them.

## Offline note
The app shell, manifest, CSS, icons, and layout are cached. Live data refresh requires an internet connection; the last successful link list and identity are retained in localStorage for repeat visits.
