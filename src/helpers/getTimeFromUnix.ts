export function getTimeFromUnix(val: number) {
  const date = new Date(val * 1000);

  return date.toLocaleTimeString();
};
