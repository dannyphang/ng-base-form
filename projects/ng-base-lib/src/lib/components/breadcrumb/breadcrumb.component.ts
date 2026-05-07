import { Component, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { ComponentImports } from '../component-import.module';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  imports: [ComponentImports]
})
export class BreadcrumbComponent {
  @Input() homeLink: string = '';
  items: MenuItem[] = [];
  home: MenuItem = {
    routerLink: '',
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['homeLink'] && changes['homeLink'].currentValue) {
      this.home = {
        routerLink: `/${changes['homeLink'].currentValue}`,
      }
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadCrumbs();
      });
    this.buildBreadCrumbs();
  }

  buildBreadCrumbs() {
    this.items = [];
    let currentRoute = this.activatedRoute.root.children[0] as ActivatedRoute | null,
      url = '';
    let lastItem = '';
    do {
      const childrenRoutes = currentRoute?.children;
      currentRoute = null;
      childrenRoutes?.forEach((route) => {
        if (route.outlet === 'primary' && route.snapshot?.data?.['title']) {
          const routeSnapshot = route.snapshot;
          if (lastItem != routeSnapshot.data['title']) {
            lastItem = routeSnapshot.data['title'];
            url +=
              '/crm/' + routeSnapshot.url.map((segment) => segment.path).join('/');
            this.items.push({
              label: this.translateService.instant(routeSnapshot.data['title']),
              routerLink: url,
            });
          }
          currentRoute = route;
        }
      });
    } while (currentRoute);
  }
}
