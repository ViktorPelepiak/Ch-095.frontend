
export class Contact {
  id: number;
  name: string;
  email: string;
}

export class ContactTableCol {
  title: string;
  field: string;
  selected?: boolean = false;
  direction?: Direction = Direction.ASC;
}

export enum Direction {
  ASC = "ASC",
  DESC = "DESC"
}
