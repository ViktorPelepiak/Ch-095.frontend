export class Pageable {
  size: number;
  currentPage: number;
  lastPage: number;
  direction?: Direction;
  sort?: string;
}
export enum Direction {
  ASC = "ASC",
  DESC = "DESC"
}
