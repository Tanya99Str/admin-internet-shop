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
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import {HeaderComponent} from './home/source/header/header.component';
import { CatalogComponent } from './home/catalog/catalog.component';
import { CatalogOneComponent } from './home/catalog/catalog-one/catalog-one.component';
import { FooterComponent } from './home/source/footer/footer.component';
import { ProfileComponent } from './home/source/profile/profile.component';
// import {homeRoutes} from './home/home.module';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: '', redirectTo: 'catalog', pathMatch: 'full'},
      {path: 'catalog', component: CatalogComponent},
      {path: 'profile', component: ProfileComponent}
    ]},
  {
    path: 'sign', component: SignComponent, children: [
      {path: 'in', component: SignInComponent},
      {path: 'up', component: SignUpComponent}
    ]
  },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    CatalogComponent,
    CatalogOneComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GlobalImportModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
