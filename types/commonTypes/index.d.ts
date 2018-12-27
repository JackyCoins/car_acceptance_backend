declare module 'commonTypes' {
  interface TypesDamage {
    scratch: boolean;
    dent: boolean;
    chip: boolean;
  }

  export interface PartOfCar {
    name: string;
    title: string;
    comment?: string;
    level: number;
    typesDamage: TypesDamage;
  }

  export interface StatusOfOrder {
    id: number;
    title: string;
  }

  export interface Equipment {
    id: number;
    name: string;
    count: number;
    title: string;
    values: number;
  }
}
