import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrPage } from './qr.page';

const routes: Routes = [
  {
    path: '',
    component: QrPage
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrPageRoutingModule {}
