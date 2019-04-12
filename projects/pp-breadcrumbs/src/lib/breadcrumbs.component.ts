import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from './breadcrumb';
import { PpBreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'pp-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class PpBreadcrumbsComponent implements OnInit, OnDestroy {
  crumbs: Breadcrumb[];
  subscriptions: Subscription[] = [];

  constructor(public service: PpBreadcrumbsService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.service.crumbs$.subscribe(x => {
        this.crumbs = x;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
    localStorage.removeItem('fromBreadCrumb');
  }

  click() {
    localStorage.setItem('fromBreadCrumb', 'true');
  }
}
