import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyWalletPageComponent } from './pages/dummy-wallet-page/dummy-wallet-page.component';
import { LoginPopupComponent } from './pages/login-popup/login-popup.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { SignTransactionComponent } from './pages/sign-transaction/sign-transaction.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {
    path: '',
    component: LoginRegisterComponent
  },
  {
    path: 'cloud-wallet/login',
    component: LoginPopupComponent,
    
  },
  {
    path: 'cloud-wallet/signing',
    component: SignTransactionComponent,
  },
  {
    path: 'dummy-wallet',
    component: DummyWalletPageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
