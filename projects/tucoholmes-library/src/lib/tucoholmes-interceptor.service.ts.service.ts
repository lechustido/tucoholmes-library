import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { TucoholmesLibraryService } from './tucoholmes-library.service';
import { inject, Injector } from '@angular/core';
import { HttpCallModel } from './models/httpCall.model';

//let tucoService: TucoholmesLibraryService;

export const TucoholmesInterceptorHttp: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const injector = inject(Injector);
  const tucoService = injector.get(TucoholmesLibraryService);

  let newCall:HttpCallModel = new HttpCallModel();
  const headers = extractResponse(req);

  newCall.headers = headers;
  newCall.method = req.method;
  newCall.url = req.url;
  newCall.postData = req.body;

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        newCall.response = event.body;
        newCall.responseHeaders = extractResponseHeaders(event);
        tucoService.updateHttpCall(newCall);
      }
    }),
    catchError((err: HttpErrorResponse) => {
      console.log(req)

      if (!tucoService) {

      }
      return throwError(err);
    }),
    finalize(() => {


      // You can add any cleanup logic aquí si es necesario
    })
  );
};

export function extractResponse(request: HttpRequest<any>): { [key: string]: string } {
  const headers = request.headers.keys().reduce((acc:any, key) => {
    acc[key] = request.headers.get(key);
    return acc;
  }, {} as { [key: string]: string });
  return headers;
}

export function extractResponseHeaders(response: HttpResponse<any>): { [key: string]: string } {
  const headers = response.headers.keys().reduce((acc, key) => {
    acc[key] = response.headers.get(key) || '';
    return acc;
  }, {} as { [key: string]: string });
  return headers;
}

