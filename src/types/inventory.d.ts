interface Shirt {
  id: number;
  belongsTo?: string;
  gender?: string;
  uniformType?: string;
  shoulderLength?: number;
  sleevesLength?: number;
  collarLength?: number;
  shirtLocation?: { Row: number; Rack: string };
};

interface Pants {
  id: number;
  belongsTo?: string;
  gender?: string;
  uniformType?: string;
  pantsLength?: number;
  waistLength?: number;
  pantsLocation?: { Row: number; Rack: string };
};