import {ActivatedRoute, Router} from '@angular/router';

export class RedirectUtil {

  constructor(private router: Router) {
  }

  public setParam(name: string, value: string): void {
    const params = (new URL(document.location.href)).searchParams;
    params.set(name, value);
    location.search = '?' + params.toString();
  }

  public setParam2(name: string, value: string, name2: string, value2: string): void {
    const params = (new URL(document.location.href)).searchParams;
    params.set(name, value);
    params.set(name2, value2);
    location.search = '?' + params.toString();
  }

  public appendParam(name: string, value: string): void {
    const params = (new URL(document.location.href)).searchParams;
    params.set(name, value);
    location.search = params.toString();
  }

}
