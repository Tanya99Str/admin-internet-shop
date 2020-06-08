import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalImportModule} from './shared/global-import.module';
import {MaterialModule} from './shared/material.module';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/service/interceptor/auth.interceptor';
// import {homeRoutes} from './home/home.module';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from './home/products/products.component';
import { NewProductComponent } from './home/new-product/new-product.component';
import { OneProductComponent } from './home/products/one-product/one-product.component';
import { CollectionsComponent } from './home/collections/collections.component';
import { NewCollectionComponent } from './home/new-collection/new-collection.component';
import { ColorsComponent } from './home/colors/colors.component';
import { NewColorComponent } from './home/new-color/new-color.component';
import { NewCategoryComponent } from './home/new-category/new-category.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { SubCategoriesComponent } from './home/sub-categories/sub-categories.component';
import { NewSubCategoryComponent } from './home/new-sub-category/new-sub-category.component';
import { NewSizeComponent } from './home/new-size/new-size.component';
import { SizeComponent } from './home/size/size.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: 'products', component: ProductsComponent},
      {path: 'new-product', component: NewProductComponent},
      {path: 'collections', component: CollectionsComponent},
      {path: 'new-collection', component: NewCollectionComponent},
      {path: 'colors', component: ColorsComponent},
      {path: 'new-color', component: NewColorComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'new-category', component: NewCategoryComponent},
      {path: 'sub-categories', component: SubCategoriesComponent},
      {path: 'new-sub-category', component: NewSubCategoryComponent},
      {path: 'size', component: SizeComponent},
      {path: 'new-size', component: NewSizeComponent},
    ]},
  {path: 'sign', component: SignComponent, children: [
      {path: '', redirectTo: 'in', pathMatch: 'full'},
      {path: 'in', component: SignInComponent},
    ]},
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignComponent,
    SignInComponent,
    HeaderComponent,
    ProductsComponent,
    NewProductComponent,
    OneProductComponent,
    CollectionsComponent,
    NewCollectionComponent,
    ColorsComponent,
    NewColorComponent,
    NewCategoryComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    NewSubCategoryComponent,
    NewSizeComponent,
    SizeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GlobalImportModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
