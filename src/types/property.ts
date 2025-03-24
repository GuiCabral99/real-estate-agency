export type PropertyType = "house" | "apartment";

export interface Property {
  city: string;
  neighborhood: string;
  area: number;
  built_area: number;
  sale_price?: number;
  rent_price?: number;
  garage_spots: number;
  type: PropertyType;
}
