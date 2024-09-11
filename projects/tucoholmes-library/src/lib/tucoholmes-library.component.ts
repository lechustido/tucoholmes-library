import { Component } from '@angular/core';
import { ConsoleLogsModel } from './models/consoleLogs.model';

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


  
  constructor() {
    this.isRecording = false;
    this.timer = 0;
    this.consoleLogMsg = [];
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
}
