let tg;
const isTg = true;
let tgUser = {}

if (!isTg) {
  tg = window;
  tgUser = {
    id: 1,
    username: 'guest',
    first_name: '',
    last_name: '',
    is_bot: false,
    is_premium: false,
    language: 'ru'
  }
} else {
  tg = window.Telegram.WebApp;
  tgUser = {
    id: tg?.initDataUnsafe?.user?.id,
    username: tg?.initDataUnsafe?.user?.username,
    first_name: tg?.initDataUnsafe?.user?.fisrtName,
    last_name: tg?.initDataUnsafe?.user?.lastName,
    is_bot: tg?.initDataUnsafe?.user?.is_bot,
    is_premium: tg?.initDataUnsafe?.user?.is_premium,
    language: tg?.initDataUnsafe?.user?.language_code
  }
}

const initTgApp = () => {
  if (isTg) {
    tg.disableVerticalSwipes();
    tg.setHeaderColor("#17211f");
    tg.setBackgroundColor("#0c1210");
    tg.expand();
  }
}

export { tg, tgUser, initTgApp };