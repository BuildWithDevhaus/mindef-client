export const getCurrentSlug = () => {
  const url = new URL(window.location.href);
  return url.pathname;
}