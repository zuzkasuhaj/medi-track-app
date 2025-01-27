# Medi Track – Mobilná aplikácia na správu liekov

Medi Track je mobilná aplikácia, ktorá umožňuje používateľovi sledovať dávkovanie liekov a uistiť sa, že nezabudne žiadny z nich užiť

# Technológie a konfigurácia
- Technológia: React Native s Expo
- Backend: Firebase (konfigurácia a Firestore Database)
- Testovanie: iPhone 11
- Inšpirácia: Vytvorená s pomocou tohto YouTube videa (https://www.youtube.com/watch?v=2ua_Eu0LhcI&t=11837s) a ChatGPT

# Obrazovky aplikácie
Aplikácia obsahuje 7 obrazoviek:

# Úvodná obrazovka
- Po otvorení aplikácie privíta používateľa obrazovka s obrázkom, textom a tlačidlom „Continue“ pre pokračovanie

# Obrazovka prihlásenia
- Možnosť prihlásiť sa pomocou emailu a hesla
- Ak používateľ nemá účet, môže si ho jednoducho vytvoriť

# Obrazovka vytvorenia účtu
- Umožňuje vytvoriť nový účet, po úspešnom vytvorení je používateľ automaticky presmerovaný do aplikácie

# Domovská obrazovka
- Obsahuje navigačnú lištu s 3 tlačidlami: Home, Add New, a Profile
- Zobrazuje týždenný kalendár s možnosťou kliknúť na konkrétny deň a vidieť zoznam liekov na daný deň
- Po kliknutí na konkrétny liek sa zobrazí detailná obrazovka Reminder

# Obrazovka Reminder
- Používateľ môže označiť, či si liek už zobral, alebo zabudol
  - ✓: Lieky, ktoré boli užité
  - ✗: Lieky, ktoré neboli užité
- Tento stav sa zobrazuje v zozname liekov na domovskej obrazovke

# Obrazovka Add New
- Umožňuje pridať nový liek
- Používateľ zadáva alebo vyberá informácie ako:
  - Meno lieku (napr. Paralen)
  - Typ lieku (kapsule, sirup, atď.)
  - Množstvo dávky
  - Čas a dátumy užívania
- Po kliknutí na tlačidlo „Add New Medication“ sa liek uloží do databázy používateľa

# Obrazovka Profil
- Zobrazuje meno a email používateľa
- Obsahuje tlačidlo na odhlásenie



"# medi-track" 
