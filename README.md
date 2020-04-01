# Minesweeper


## Apribojimai:
- bent vienas langelis be bombos
- mažiausiai bombų: 1
- daugiausiai bombų: (MxN)-1

## Lentos dydis:
- mažiausias: 2x1
- didžiausias: MxN

## Žaidimo logika:
- laikrodžio pradinė reikšmė: 0s
- max laikrodžio reikšmė: 999s
- paspaudus ant langelio:
  - jei tai pirmas atidaromas langelis:
    - sugeneruojame bombas
  - atidaromas langelis
  - patikriname ar jame nėra bombos:
    - jei yra: GAME OVER
    - jei nėra: skaičiuojame kiek aplinkui yra bomų:
     - į atidaryta langelį įrašome suskaičiuotą kiekį
     - jeigu bombų nėra (kiekis 0), tai atidarinėja sekančius aplinkinius langelius