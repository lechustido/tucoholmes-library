import { Injectable } from '@angular/core';
import { ConsoleLogsModel } from './models/consoleLogs.model';
import { TucoholmesLibraryService } from './tucoholmes-library.service';

@Injectable({
  providedIn: 'root'
})
export class TucoholmesConsoleService {

  public consoleLogMsg: Array<ConsoleLogsModel> = [];
  public consoleErrorMsg: Array<ConsoleLogsModel> = [];
  constructor(
    public tucoholmesLibraryService:TucoholmesLibraryService
  ){

  }

  public recordConsoleLog(message: string): void {
    this.tucoholmesLibraryService.updateConsole(message);
  }

  public recordConsoleError(message: string): void {
    this.tucoholmesLibraryService.updateError(message);
  }
}
