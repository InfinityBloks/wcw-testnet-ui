import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { LoginPopupComponent } from './pages/login-popup/login-popup.component';
import { DummyWalletPageComponent } from './pages/dummy-wallet-page/dummy-wallet-page.component';
import { SignTransactionComponent } from './pages/sign-transaction/sign-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    LoginPopupComponent,
    DummyWalletPageComponent,
    SignTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
