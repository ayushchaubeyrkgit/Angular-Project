import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { AffidavitComponent } from './affidavit/affidavit.component';


const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'enquiry', component: EnquiryComponent },
  { path: 'help', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'affidavit', component: AffidavitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomePageComponent,
                                  AboutComponent,
                                  RegisterComponent,
                                  EnquiryComponent,
                                  HelpComponent,
                                  LoginComponent,
                                  AffidavitComponent]
