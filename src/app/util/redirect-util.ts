import {ActivatedRoute, Params, Router} from "@angular/router";

export class RedirectUtil {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public refreshPage(link: any[]) {
    this.routeToLink(link,JSON.parse(JSON.stringify(this.route.snapshot.queryParams)));
  }

  public setParam(key: string, value: any, link: any[]): void {
    let queryParams = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
    queryParams[key] = value;
    this.routeToLink(link,queryParams);
  }

  public deleteParam(name: string, link: any[]): void {
    let queryParams = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
    delete queryParams[name];
    this.routeToLink(link,queryParams);
  }

  public deleteParam2(name: string,name2: string, link: any[]): void {
    let queryParams = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
    delete queryParams[name];
    delete queryParams[name2];
    this.routeToLink(link,queryParams);
  }

  public setParam2(key1: string, value1: string, key2: string, value2: string, link: any[]): void {
    let queryParams = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
    queryParams[key1] = value1;
    queryParams[key2] = value2;
    this.routeToLink(link,queryParams);
  }

  private routeToLink(link: any[], queryParams: Params){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(link, {queryParams})
    );
  }

}
