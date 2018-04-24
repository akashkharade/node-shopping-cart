import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from './ApiInfoService';
import {ApiInfo} from './ApiInfo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiInfo:ApiInfo = new  ApiInfo("","");
  constructor(  private apiService: ApiInfoService ){
    this.apiInfo = new  ApiInfo("","");
  }

  ngOnInit() {
    // Load comments
    this.loadAPIInfo()
  }

  loadAPIInfo(){
    this.apiService.getAPInfo().subscribe(apinfo => {
      console.log("loadAPIInfo  ",apinfo);
      this.apiInfo =  apinfo;

    });
  }

  title = 'app';
}
