export default function numberToTime(num) {
  let millisekunden = num % 1000;
  let Zehntelsekunden = (millisekunden - (millisekunden % 100)) / 100;
  let restZeit = (num - millisekunden) / 1000;

  let Stunden = Math.floor(restZeit / (60 * 60));

  let Minuten = Math.floor((restZeit - Stunden * 3600) / 60);

  let Sekunden = Math.floor(restZeit - Stunden * 3600 - Minuten * 60);
  if (Stunden > 0 && Minuten < 10)
    return `${Stunden}:0${Minuten}:${Sekunden} h`;
  if (Stunden > 0) return `${Stunden}:${Minuten}:${Sekunden} h`;
  if (Minuten > 0 && Sekunden < 10) return `${Minuten}:0${Sekunden} min`;
  if (Minuten > 0) return `${Minuten}:${Sekunden} min`;
  if (Sekunden > 0) return `${Sekunden}.${Zehntelsekunden} s`;
  return `${millisekunden} ms`;
}

// function num2str(num) {
//   return String(num);
// }

// export default function numberToTime(EndZeit) {
//   const Millisekunden = num2str(
//     Math.round((EndZeit - Math.floor(EndZeit)) * 1000)
//   );
//   EndZeit = Math.floor(EndZeit);
//   let Stunden = Math.floor(EndZeit / 3600);
//   let Minuten = Math.floor((EndZeit - Stunden * 3600) / 60);
//   let Sekunden = EndZeit - Stunden * 3600 - Minuten * 60;
//   if (Stunden < 10) Stunden = '0' + num2str(Stunden);
//   else Stunden = num2str(Stunden);

//   if (Minuten < 10) Minuten = '0' + num2str(Minuten);
//   else Minuten = num2str(Minuten);

//   if (Sekunden < 10) Sekunden = '0' + num2str(Sekunden);
//   else Sekunden = num2str(Sekunden);

//   let strZeit = Stunden + ':' + Minuten + ':' + Sekunden + '.' + Millisekunden;
//   return strZeit;
// }
