export class HttpCallModel {
  public headers:any;
  public status!:number;
  public timers!:number;
  public responseHeaders:any;
  public url!:string;
  public method!:string;
  public response: any
  public timer!:number;
  public postData!:any|null;
}
