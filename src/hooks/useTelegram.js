const tg = window.Telegram.WebApp;

const tgUser = {
  id: tg.initDataUnsafe.user.id,
  username: tg.initDataUnsafe.user.username,
  first_name: tg.initDataUnsafe.user.fisrtName,
  last_name: tg.initDataUnsafe.user.lastName,
  is_bot: tg.initDataUnsafe.user.is_bot,
  is_premium: tg.initDataUnsafe.user.is_premium,
  language: tg.initDataUnsafe.user.language_code
}

const initTgApp = () => {
  tg.disableVerticalSwipes();
  tg.expand();
}

export { tgUser, initTgApp };