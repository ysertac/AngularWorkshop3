import { Routes } from '@angular/router';
import { HomePageComponent } from './routers/home-page/home-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { TestPageComponent } from './routers/test-page/test-page.component';
import { NotFoundPageComponent } from './routers/not-found-page/not-found-page.component';
import { ModelsListComponent } from './features/models/components/models-list/models-list.component';
import { BrandsListComponent } from './features/models/components/brands-list/brands-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'prefix',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'models',
        component: ModelsListComponent,
      },
      {
        path: 'brands',
        component: BrandsListComponent,
      },
    ],
  },
  {
    path: 'testpage',
    component: TestPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
