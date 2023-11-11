export function getPhotoParams(): string[] {
  const params: string[] = [];
  const today = new Date();

  const month = today.getMonth();
  const hours = today.getHours();

  switch (month) {
    case 11:
    case 0:
    case 1:
      params.push('winter');
      break;
    case 2:
    case 3:
    case 4:
      params.push('spring');
      break;
    case 5:
    case 6:
    case 7:
      params.push('summer');
      break;
    case 8:
    case 9:
    case 10:
      params.push('autumn');
      break;
    default:
      params.push('weather');
  }

  switch (hours) {
    case 18:
    case 19:
    case 20:
    case 21:
      params.push('sunset');
      break;
    case 22:
    case 23:
    case 24:
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      params.push('night');
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      params.push('sunrise');
      break;
    default:
      params.push('day');
      break;
  }

  return params;
}