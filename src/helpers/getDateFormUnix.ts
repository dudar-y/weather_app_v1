export function getDateFromUnix(val: number): string {
  const date = new Date(val * 1000);

  return date.toLocaleDateString();
};
