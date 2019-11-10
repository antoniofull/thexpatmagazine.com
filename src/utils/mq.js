export function mq() {
  let limit = 12;
  if (typeof window === 'undefined' || !window) {
    return {
      limit
    };
  }

  let mql = window.matchMedia('(max-width: 1280px)');
  if (mql.matches) {
    limit = 6;
  }

  return {
    limit
  };
}
