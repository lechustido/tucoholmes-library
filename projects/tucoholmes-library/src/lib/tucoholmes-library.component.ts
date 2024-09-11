import { Component } from '@angular/core';
import { ConsoleLogsModel } from './models/consoleLogs.model';
import { ScreenRecorderService } from './tucoholmes-screen-recorder.service';

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
  public timer!: number;
  public interval:any;



  constructor(
    private screenRecorderService:ScreenRecorderService
  ) {
    this.isRecording = false;
    this.timer = 0;
    this.consoleLogMsg = [];
  }

  public startTimmer():void{
    this.interval = setInterval(() => {
      this.captureLocalStorageData();
      this.timer++;
    }, 1000);
  }

  public recordConsoleLog(message: string): void {
    this.consoleLogMsg.push({
      error: message,
      timer: this.timer,
    });
  }

  public recordConsoleError(message: string): void {
    this.consoleErrorMsg.push({
      error: message,
      timer: this.timer,
    });
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

    console.log(storageArray)
  }

  public recordScreen():void{
    this.screenRecorderService.startRecording();
  }
}
