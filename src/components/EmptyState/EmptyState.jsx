import React from 'react';
import './EmptyState.css';
import { LuMoonStar, LuSquareBottomDashedScissors } from 'react-icons/lu';
import { PiMagicWandLight } from 'react-icons/pi';
import { GiCrystalBall } from 'react-icons/gi';
import { TbMoonStars } from 'react-icons/tb';


const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="empty-state-container">
      <GiCrystalBall  className="empty-icon" />
      <h2 className="empty-title">{title}</h2>
      <p className="empty-subtitle">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
