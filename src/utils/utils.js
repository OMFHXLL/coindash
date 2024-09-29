function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = '';

  // Добавляем часы, если они больше 0
  if (hrs > 0) {
      result += `${hrs}:`;
  }

  // Добавляем минуты, если они больше 0, или если уже были добавлены часы
  if (mins > 0 || hrs > 0) {
      result += `${mins}:`;
  }

  // Секунды всегда добавляем
  if (secs < 10 && mins > 0) {
    result += `0${secs}`;
  } else {
    result += `${secs}`;
  }

  return result;
}

function formatScore(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}



// IMPORT RANK ICONS
function importRankIcons(r) {
  let icons = {};
  r.keys().forEach((item) => {
    icons[item.replace('./', '')] = r(item);
  });
  return icons;
}

const rankIcons = importRankIcons(require.context('../assets/image/ranks', false, /\.png$/));
console.log(rankIcons[Object.keys(rankIcons)[1]])





export { formatTime, formatScore, rankIcons }