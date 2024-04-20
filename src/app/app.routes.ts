import { Routes } from '@angular/router';
import { HomePageComponent } from './routers/home-page/home-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { TestPageComponent } from './routers/test-page/test-page.component';
import { NotFoundPageComponent } from './routers/not-found-page/not-found-page.component';
import { BrandsPageComponent } from './routers/brands-page/brands-page.component';
import { CreateBrandPageComponent } from './routers/create-brand-page/create-brand-page.component';
import { UpdateBrandPageComponent } from './routers/update-brand-page/update-brand-page.component';

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
        path: 'brands',
        component: BrandsPageComponent,
      },
      {
        path: 'brands/createbrand',
        component: CreateBrandPageComponent,
      },
      {
        path: 'brands/:id',
        component: UpdateBrandPageComponent,
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
