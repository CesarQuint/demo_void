export const getHeight = (el) => {
  const computedStyle = getComputedStyle(el);
  let elementHeight = el.clientHeight; // height with padding
  elementHeight -=
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);
  return elementHeight;
};
