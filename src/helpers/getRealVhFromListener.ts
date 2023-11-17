export const getRealVhFromListener = () => {
  let vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const vhListener = () => {
    vh = window.innerHeight;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('resize', vhListener);
};
