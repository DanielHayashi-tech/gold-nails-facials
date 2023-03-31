import React from 'react';

const ScrollDownButton = () => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={handleClick}>
      
    </button>
  );
};

export default ScrollDownButton;