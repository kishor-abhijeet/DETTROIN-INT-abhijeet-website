let timeout;
export function debounceSearch(fn, delay = 250) {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
