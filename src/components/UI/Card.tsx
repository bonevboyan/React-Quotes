import React from 'react';
import classes from './Card.module.css';

const Card: React.FC<{className?: string, children: React.ReactNode}> = (props) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
