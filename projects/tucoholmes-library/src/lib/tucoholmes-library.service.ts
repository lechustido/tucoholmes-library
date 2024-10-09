import { Injectable } from '@angular/core';
import { HttpCallModel } from './models/httpCall.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsoleLogsModel } from './models/consoleLogs.model';

@Injectable({
  providedIn: 'root'
})
export class TucoholmesLibraryService {
  public messageSource: BehaviorSubject<HttpCallModel> = new BehaviorSubject<HttpCallModel>(
    new HttpCallModel(),
  );
  public currentMessage: Observable<HttpCallModel> = this.messageSource.asObservable();
  public httpCalls: Array<HttpCallModel> = [];

  public messageSourceConsole: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentMessageConsole: Observable<string> = this.messageSourceConsole.asObservable();

  public messageSourceError: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentMessageError: Observable<string> = this.messageSourceError.asObservable();

  constructor() { }

  public updateHttpCall(httpCall: HttpCallModel): void {
    this.messageSource.next(httpCall);
  }

  public updateConsole(msg:string): void {
    this.messageSourceConsole.next(msg[0]);
  }

  public updateError(msg:string): void {
    this.messageSourceError.next(msg);
  }
}
