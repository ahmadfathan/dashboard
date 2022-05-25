import { Component } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'dashboard';

  private subscription: Subscription;
  public message: string = '';
  public data: any;
  selectedOption: any = null;
  deviceList: any[] = [];
  surveyData = [
    { name: 'Bikes', value: 105000 },
    { name: 'Cars', value: 55000 },
    { name: 'Trucks', value: 15000 },
    { name: 'Scooter', value: 150000 },
    { name: 'Bus', value: 20000 }
  ];
  
  constructor(
    private _mqttService: MqttService,
    private apiService: APIService
  ) 
  {
    apiService.getDeviceList().subscribe(
      (result) => {
        this.deviceList = result.results.data;
      }
    )

    this.subscription = this._mqttService.observe('monitoring/hl-114').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      this.data = JSON.parse(this.message);
    });
  }

  onDeviceChanged(){
    this.data = null;
    this.subscription.unsubscribe();    
    this.subscription = this._mqttService.observe('monitoring/' + this.selectedOption).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      this.data = JSON.parse(this.message);
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
