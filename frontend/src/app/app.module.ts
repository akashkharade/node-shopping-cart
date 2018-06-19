import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiInfoService} from './ApiInfoService';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms'; 
import { RegisterService } from './register/register.service';
import { LoginService } from "./login/login.service";
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CategoryService } from './category.service';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './order.service';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    UserOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule,
    //AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'user-orders', component: UserOrdersComponent, canActivate: [AuthGuard]},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent},
      {path: 'product/:id' , component: ProductDetailsComponent},
    ]),
    NgbModule.forRoot()
  ],
  providers: [
  	ApiInfoService,
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    OrderService,
    RegisterService,
    LoginService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
