# Omsorgspenger-kalkulator
Regner ut antall dager med omsorgspenger man har rett til.

## Komme i gang
### Kjøre lokalt
````
yarn install
yarn start
````

### Testing
````
yarn test
````

### For NAV-ansatte
Interne henvendelser kan sendes via Slack i kanalen **#sif_omsorgspenger**.

### For å publisere
Velg én av disse tre for å øke versjonnummeret
````
npm version patch
npm version minor
npm version major
````
Deretter
````
npm publish
````
Husk å pushe etterpå, ettersom npm version lager en ny commit og tag'er den med den nye versjonen.
