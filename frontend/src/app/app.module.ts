import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ApiInfoService} from './ApiInfoService';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms'; 
import { RegisterService } from './register/register.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule
  ],
  providers: [ApiInfoService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
