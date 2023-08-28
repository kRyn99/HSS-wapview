import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpointHistoryComponent} from './upoint-history.component';
import {UpointHistoryViewComponent} from './components/upoint-history-view/upoint-history-view.component';
import {TransactionDetailComponent} from '@app/modules/upoint-history/components/transaction-detail/transaction-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Upoint History module'
    },
    component: UpointHistoryComponent,
    children: [
      {
        path: '',
        redirectTo: 'upoint-history-view',
        pathMatch: 'full'
      },
      {
        path: 'upoint-history-view',
        data: {
          title: 'Upoint history view'
        },
        component: UpointHistoryViewComponent
      },
      {
        path: 'transaction-detail',
        data: {
          title: 'View transaction detail'
        },
        component: TransactionDetailComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpointHistoryRoutingModule { }
