import { GameContext, actions } from '../../../context/GameContext';
import { useContext } from 'react';

const ranks = [
  'Новичок',
  'Молодая монета',
  'Перспективная монета',
  'Средняя капитализация',
  'Высокая капитализация',
  'Топ монета',
  'Премиум монета',
  'Мировой лидер',
  'Крипто гегемон',
]

function Rank() {
  const { state } = useContext(GameContext);
  const { level } = state;

  return(
    <div className="rank">
      {ranks[level - 1]}
    </div>
  )
}

export default Rank;