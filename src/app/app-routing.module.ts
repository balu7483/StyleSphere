import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { UseraddComponent } from './components/useradd/useradd.component';
import { SignupComponent } from './components/signup/signup.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepasswordComponent } from './componenets/changepassword/changepassword.component';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './componenets/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './customercomponent/home/home.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserComponent},
  {path:'user/add',component:UseraddComponent},
  {path:'signup',component:SignupComponent},
  {path:'user/update/:id',component:EdituserComponent},
  {path:'user/profile/:email',component:ProfileComponent},
  {path:'user/changePassword/:id',component:ChangepasswordComponent},
  {path:'productsModel',redirectTo:'product',pathMatch:'full'},
  {path:'product',component:ProductComponent},
  {path:'product/add',component:AddProductComponent},
  {path:'product/edit/:id',component:EditProductComponent},
  {path:'customerModel',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'home/:email',component:HomeComponent},
  {path:'card/:value',component:ImageCardComponent},
  {path:'card/:value/:email',component:ImageCardComponent},
  {path:'cardInfo/:id',component:CardDetailsComponent},
  {path:'cardInfo/:id/:email',component:CardDetailsComponent},
  {path:'cart/:email',component:CartComponent},
  {path:'checkout/:email/:totalPrice/:id',component:CheckoutComponent},
  {path:'pay/:email/:totalPrice',component:PaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
