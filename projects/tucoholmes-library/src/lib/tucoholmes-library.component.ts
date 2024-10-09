import { Component } from '@angular/core';
import { ConsoleLogsModel } from './models/consoleLogs.model';
import { ScreenRecorderService } from './tucoholmes-screen-recorder.service';
import { TucoholmesLibraryService } from './tucoholmes-library.service';
import { Subscription } from 'rxjs';
import { HttpCallModel } from './models/httpCall.model';

@Component({
  selector: 'lib-tucoholmes-library',
  standalone: true,
  imports: [],
  templateUrl: `tucoholmes-library.component.html`,
  styles: ``,
})
export class TucoholmesLibraryComponent {
  public isRecording!: boolean;
  public consoleLogMsg!: Array<ConsoleLogsModel>;
  public consoleErrorMsg!: Array<ConsoleLogsModel>;
  public localStorageData!: Array<{ key: string, value: string }>;
  public httpRequestData!: Array<HttpCallModel>;
  public timer!: number;
  public interval:any;

  //Subscripciones a distintos services
  public consoleLogSubscription!:Subscription;
  public consoleErrorSubscription!:Subscription;
  public videoSubscription!:Subscription;
  public httpSubscription!:Subscription;

  constructor(
    private screenRecorderService:ScreenRecorderService,
    private tucoholmesLibraryService: TucoholmesLibraryService
  ) {
    this.isRecording = false;
    this.timer = 0;
    this.consoleLogMsg = [];
  }

  public initAllData():void{
    this.consoleLogMsg = new Array<ConsoleLogsModel>();
    this.consoleErrorMsg = new  Array<ConsoleLogsModel>();
    this.localStorageData = new Array<{ key: string, value: string }>;
    this.httpRequestData = new Array<HttpCallModel>;
  }

  //#region Grabaciones de distintos elementos
  public startRecord():void{
    this.startTimmer();
  }

  public stopRecord():void{
    clearInterval(this.interval);
    this.screenRecorderService.stopRecording();
    this.consoleLogSubscription.unsubscribe();
    this.consoleErrorSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();
    this.timer = 0;
    console.log(this.consoleLogMsg);
    console.log(this.consoleErrorMsg);
    console.log(this.httpRequestData);
    console.log(this.localStorageData);
  }

  public recordConsoleLog(message: string): void {
    if(message !== '' && ( this.consoleLogMsg.length === 0 || message !== this.consoleLogMsg[this.consoleLogMsg.length - 1].error)){
      this.consoleLogMsg.push({
        error: message,
        timer: this.timer,
      });
    }

  }

  public recordConsoleError(message: string): void {
    if (message !== '' && (this.consoleErrorMsg.length === 0 || message !== this.consoleErrorMsg[this.consoleErrorMsg.length - 1].error)) {
      this.consoleErrorMsg.push({
        error: message,
        timer: this.timer,
      });
    }
  }

  public  captureLocalStorageData(): void {
    const storageArray: Array<{ key: string, value: string }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);  // Obtiene la clave
      const value = key ? localStorage.getItem(key) : '';  // Obtiene el valor asociado a la clave
      if (key && value !== null) {
        storageArray.push({ key, value });
      }
    }
    this.localStorageData = storageArray;
  }

  public recordScreen():void{
    this.screenRecorderService.startRecording();
  }
  //#endregion Grabaciones de distintos elementos


  //#region Subscripciones a diferentes eventos
  public initConsoleLogSubs():void{
    this.consoleLogSubscription = this.tucoholmesLibraryService.currentMessageConsole.subscribe((message: string) => {
      this.recordConsoleLog(message);
    });
  }

  public initConsoleErrorSubs():void{
    this.consoleErrorSubscription = this.tucoholmesLibraryService.currentMessageError.subscribe((message: string) => {
      this.recordConsoleError(message);
    });
  }

  public initVideoSub():void{
    this.videoSubscription = this.screenRecorderService.currentMessageVideo.subscribe((message: string) => {
      if(message !== ''){
        console.log(message);
        this.videoSubscription.unsubscribe();
      }
    });
  }

  public initHttpSub():void{
    this.httpSubscription = this.tucoholmesLibraryService.currentMessage.subscribe((message: HttpCallModel) => {
        this.httpRequestData.push(message)
    });
  }


  //#endregion Subscripciones a diferentes eventos
  public startTimmer():void{
    this.initAllData();
    this.initConsoleLogSubs();
    this.initConsoleErrorSubs();
    this.initVideoSub();
    this.captureLocalStorageData();
    this.recordScreen();
    this.initHttpSub();
    this.interval = setInterval(() => {
     // this.captureLocalStorageData();
      this.timer++;
    }, 1000);
  }

}
