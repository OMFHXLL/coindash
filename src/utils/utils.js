

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

function formatConversion(num) {
  // Умножаем num на 0.002
  const convertedNum = num * 0.002;
  
  // Разделяем целую и дробную части
  const integerPart = Math.floor(convertedNum);
  const fractionalPart = Math.round((convertedNum - integerPart) * 100);
  
  // Форматируем целую часть
  const formattedInteger = formatScore(integerPart);
  
  // Форматируем дробную часть, добавляем ноль, если необходимо
  const formattedFractional = fractionalPart < 10 ? '0' + fractionalPart : fractionalPart;

  // Объединяем целую и дробную части
  return `${formattedInteger},${formattedFractional}`;
}

// Пример использования
console.log(formatConversion(12432)); // 12.432,34

// IMPORT RANK ICONS
function importImg(r) {
  let icons = {};
  r.keys().forEach((item) => {
    icons[item.replace('./', '')] = r(item);
  });
  return icons;
}

const rankIcons = importImg(require.context('../assets/image/ranks', false, /\.png$/));
const coinIcons = importImg(require.context('../assets/image/coins', false, /\.png$/));




// CHECK USER SUBSCRIPTION
function checkUserSubscription(userId, chatId, callback) {
  const token = '7003559801:AAFUCthigVJgzuipUyMsbRdb3ATE-c2hPys';
  const url = `https://api.telegram.org/bot${token}/getChatMember?chat_id=${chatId}&user_id=${userId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        const chatMember = data.result;
        if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
          callback(true);
        } else {
          callback(false);
        }
      } else {
        console.error(data.description);
        callback(false);
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе:', error);
      callback(false);
    });
}
// checkUserSubscription(1257045227, '@testchatcoindash', (isSubscribed) => {
//   console.log(isSubscribed);
// });



export { formatTime, formatScore, formatConversion, rankIcons, coinIcons, checkUserSubscription }