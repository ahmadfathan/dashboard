import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from "@angular/material/card";

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APIService } from './services/api.service';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'ibncorp.co.id',
  port: 9001,
  path: '/'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserAnimationsModule,
    MatCardModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
