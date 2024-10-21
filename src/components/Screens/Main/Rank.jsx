import { useGlobalState } from '../../../context/state';

const ranks = [
  'Новичок',
  'Искатель',
  'Завоеватель',
  'Стратег',
  'Мастер',
  'Властелин',
  'Хранитель',
  'Император',
  'Легенда'
]

function Rank() {
  const [ level ] = useGlobalState('level');

  return (
    <div className="rank">
      {ranks[level - 1]}
    </div>
  )
}

export default Rank;