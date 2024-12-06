export const disableBackOptionWhenAdmin = () => {
  return window.location.href.includes('admin') ? false : true
};