import defaultBackground from '../../assets/img/background-default.png';

const unsplashKeys = [
  'DhLzfaMDrkRYV3kP2u7nTx36os1Q9FXpxiaI3a7jqRs',
  'FhFL7l9jnKwIzgHAxr6hRr-e-yToH3BiPkNO6WObYB0',
  '4H27PmRqWHi29c44itGsQFuvHhAHwK80eX6ml8EWigg',
  'QxlyPuQCHllXkHDEyyTsDNnJr5rHpnZ27kqM24Y_zjo',
];

const background = document.querySelector('.background');

function getKeyWords({ hour, month }) {
  let time = null;
  if (hour <= 6) time = 'night';
  if (hour <= 12 && hour > 6) time = 'morning';
  if (hour <= 18 && hour > 12) time = 'afternoon';
  if (hour <= 24 && hour > 18) time = 'evening';

  let season = null;
  if (month <= 1 || month === 11) season = 'winter';
  if (month <= 4 && month > 1) season = 'spring';
  if (month <= 7 && month > 4) season = 'summer';
  if (month <= 10 && month > 7) season = 'autumn';
  /* eslint-disable-next-line */
  console.log(`Key words for background: ${time}, ${season}`);
  return { time, season };
}

async function getBackground({ time, season }) {
  const unsplashKey = unsplashKeys[Math.floor(Math.random() * unsplashKeys.length)];
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${season} ${time} nature&client_id=${unsplashKey}`;

  const response = await fetch(url);
  const json = await response.json();
  const srcToImg = await fetch(json.urls.regular);
  const blob = await srcToImg.blob();
  const img = URL.createObjectURL(blob);
  return img;
}

async function changeBackground({ monthString, timeString }) {
  try {
    const month = Number(monthString);
    const hour = Number(timeString);
    const keyWords = getKeyWords({ hour, month });
    const img = await getBackground(keyWords);
    background.style.backgroundImage = `url(${img})`;
  } catch {
    background.style.backgroundImage = `url(${defaultBackground})`;
  }
}

export default changeBackground;
