import {
  HTMLAttributes,
  DetailedHTMLProps,
} from "react";

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

export type GeoData = {
  country?: string;
  state?: string;
  ISO_state?: string;
  ISO_country?: string;
  display_name: string;
  about?: string;
  flag_url?: string;
  capital?: string;
  largest_city?: string;
  area?: string;
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  timezones?: string[];
  official_name?: string;
  top_level_domain?: string[];
  calling_code?: string;
  population?: string;
  error?: string;
  type: string;
  ocean_name?: string;
};

export type OnIntersectionProps = {
  id: string;
  entry: IntersectionObserverEntry;
};

export type VisibilityState = {
  firstIconVisible: boolean;
  lastIconVisible: boolean;
  position: "start" | "middle" | "end";
};

export type ScrollablePaneProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users: User[];
  onIntersection: ({ id, entry }: OnIntersectionProps) => void;
};
