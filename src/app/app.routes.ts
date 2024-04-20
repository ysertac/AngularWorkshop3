import { Routes } from '@angular/router';
import { HomePageComponent } from './routers/home-page/home-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { TestPageComponent } from './routers/test-page/test-page.component';
import { NotFoundPageComponent } from './routers/not-found-page/not-found-page.component';
import { BrandsPageComponent } from './routers/brands-page/brands-page.component';
import { CreateBrandPageComponent } from './routers/create-brand-page/create-brand-page.component';
import { UpdateBrandPageComponent } from './routers/update-brand-page/update-brand-page.component';
import { CreateModelPageComponent } from './routers/create-model-page/create-model-page.component';
import { UpdateModelPageComponent } from './routers/update-model-page/update-model-page.component';

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
      {
        path: 'models/createmodel',
        component: CreateModelPageComponent,
      },
      {
        path: 'models/:id',
        component: UpdateModelPageComponent,
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
