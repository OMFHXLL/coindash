import React, { useEffect, useState } from 'react';
import { DB } from '../../db';

const MainScreen = ({ userId }) => {
  const [score, setScore] = useState(0);
  const [income, setIncome] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await DB
        .from('users')
        .select('*')
        .eq('tg_id', userId)
        .single();
      if (data) {
        console.log(data);
        setScore(data.score);
        // setIncome(data.income);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleClick = async () => {
    const newScore = score + 1;
    setScore(newScore);

    await DB
      .from('users')
      .update({ score: newScore })
      .eq('tg_id', userId);
  };

  return (
    <div>
      <div className="main-score">{score}</div>
      <button className="main-button" onClick={handleClick}>Кликни на монетку!</button>
    </div>
  );
};

export default MainScreen;