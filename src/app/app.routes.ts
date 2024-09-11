import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    data: {
      scrollDisabled: true,
      breadcrumb: '',
      isHeader: true,
      isNewRoute: true,
    },
    children: [
      {
        path: 'test-page',
        component: TestPageComponent,
      },
    ],
  },
];
