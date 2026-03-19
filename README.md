# Jochem's Halve Marathon Trainingsapp

## Bestanden
- `index.html` — de app
- `style.css` — styling
- `app.js` — alle logica
- `supabase_setup.sql` — database setup (eenmalig uitvoeren)

## Setup (eenmalig)

### 1. Supabase database aanmaken
- Ga naar supabase.com → jouw project → SQL Editor
- Plak de inhoud van `supabase_setup.sql` erin en klik Run

### 2. Email confirmatie uitzetten (zodat je direct kan inloggen)
- Ga naar Authentication → Email Templates → of
- Authentication → Providers → Email → zet "Confirm email" uit

### 3. Op GitHub zetten
- Maak een nieuw repository aan op github.com
- Upload de 3 bestanden: index.html, style.css, app.js
- (supabase_setup.sql hoeft niet mee)

### 4. GitHub Pages aanzetten
- Settings → Pages → Branch: main → Save
- Na ~1 min live op: https://jouwgebruikersnaam.github.io/jouw-repo-naam

## Functies
- Inloggen / registreren met e-mail
- Voortgang opgeslagen in de cloud (werkt op telefoon én laptop)
- Sessies versleepbaar tussen dagen
- Sessies aanpassen (naam + detail)
- km en gevoel loggen per sessie
- Voedingspagina met tips voor/tijdens/na het lopen
- Streak teller, confetti, complimenten
