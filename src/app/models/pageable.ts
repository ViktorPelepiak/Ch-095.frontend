import {Sort} from "./sort";

export class Pageable {
  size:number;
  currentPage: number;
  lastPage:number;
  sort: Sort;
}
