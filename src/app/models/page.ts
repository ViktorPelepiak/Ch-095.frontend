import {Pageable} from "./pageable";

export class Page<T> {
  items: T[];
  pageable: Pageable;
}
