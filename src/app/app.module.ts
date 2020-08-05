import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderService } from './header.service';
import { HttpClientModule } from '@angular/common/http';
import { SignaturePadPageComponent } from './signature-pad-page/signature-pad-page.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { VoiceDataService } from './voice-data.service';
import { PreviewFirComponent } from './preview-fir/preview-fir.component';
import { OtpAadharComponent } from './otp-aadhar/otp-aadhar.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { LoginDetailComponent } from './login-detail/login-detail.component';
import { FormShoComponent } from './form-sho/form-sho.component';
import { AffidavitComponent } from './affidavit/affidavit.component';



@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignaturePadPageComponent,
    ReactiveFormComponent,
    PreviewFirComponent,
    OtpAadharComponent,
    LoginDetailComponent,
    FormShoComponent,
    AffidavitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbx-VC7svr5Uleg-U9pf5Sk-GPGbmU3HM'
    }),
    HttpClientModule,
    SignaturePadModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ],
  providers: [HeaderService, VoiceDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
