import { HomeComponent } from './home/home.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'products', component: ProductsComponent },
{ path: 'product-view/:id', component: ProductViewComponent},
{ path: 'shopping-cart', component: ShoppingCartComponent },
{ path: 'login', component: LoginComponent },

{ path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
{ path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
{ path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
{ path: 'order-view/:id', component: OrderViewComponent, canActivate: [AuthGuard] },

{ path: 'admin/product/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
{ path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
{ path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },

{ path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
