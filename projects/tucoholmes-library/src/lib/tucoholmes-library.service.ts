import { Injectable } from '@angular/core';
import { HttpCallModel } from './models/httpCall.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TucoholmesLibraryService {
  public messageSource: BehaviorSubject<HttpCallModel> = new BehaviorSubject<HttpCallModel>(
    new HttpCallModel(),
  );
  public currentMessage: Observable<HttpCallModel> = this.messageSource.asObservable();
  public httpCalls: Array<HttpCallModel> = [];

  constructor() { }

  public updateHttpCall(httpCall: HttpCallModel): void {
    this.messageSource.next(httpCall);
  }
}
