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

function Score ({ image }) {
  const { state, dispatch } = useContext(GameContext);
  const { score, level } = state;

  return(
    <div className="score">
      <div className='score__content'><img className='score__image' src={image} alt="" />{score}</div>
      <div className="score__rank">{ranks[level - 1]}</div>
    </div>
  )
}

export default Score;