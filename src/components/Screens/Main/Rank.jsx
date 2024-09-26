import { GameContext, actions } from '../../../context/GameContext';
import { useContext } from 'react';

const ranks = [
  'Новичок',
  'Ученик',
  'Мастер монет',
  'Эксперт тапов',
  'Виртуоз',
  'Легенда',
  'Грандмастер'
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