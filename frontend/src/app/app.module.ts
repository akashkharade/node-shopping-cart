import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ApiInfoService} from './ApiInfoService';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpModule
  ],
  providers: [ApiInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
