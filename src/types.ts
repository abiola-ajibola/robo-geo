export type Point = {
  lat: number;
  lng: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  image_url: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  Icon?: L.DivIcon;
};
