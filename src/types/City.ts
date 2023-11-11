export type City = {
  name: {
    def: string;
    uk: string,
    en: string,
  }
  id?: number;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
  sunrise?: string;
  sunset?: string;
  state?: string;
  localName?: string;
};
