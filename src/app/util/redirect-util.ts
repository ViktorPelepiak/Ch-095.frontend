
export class RedirectUtil {

  constructor() {
  }

  public static setParam(name: string, value: string): void {
    const params = (new URL(document.location.href)).searchParams;
    params.set(name, value);
    location.search = '?' + params.toString();
  }

  public static setParam2(name: string, value: string, name2: string, value2: string): void {
    const params = (new URL(document.location.href)).searchParams;
    params.set(name, value);
    params.set(name2, value2);
    location.search = '?' + params.toString();
  }

  public static appendParam(name: string, value: string): void {
    const params = (new URL(document.location.href)).searchParams;
    params.set(name, value);
    location.search = params.toString();
  }

}
