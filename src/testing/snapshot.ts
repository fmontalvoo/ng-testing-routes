import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export function fakeActivatedRouteSnapshot(options: Partial<ActivatedRouteSnapshot>) {
  return options as ActivatedRouteSnapshot;
}

export function fakeRouterStateSnapshot(options: Partial<RouterStateSnapshot>) {
  return options as RouterStateSnapshot;
}
