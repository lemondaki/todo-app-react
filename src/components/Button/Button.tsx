import React from 'react';
interface childrenProps {
  children: string;
  color: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({ children, color, handleClick }: childrenProps): JSX.Element => {
  return (
    <button className={color} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
