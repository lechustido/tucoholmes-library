import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UndefinedObjectData } from './models/undefinedObjectData.model';
import { TestPageAccessService } from './test-page.access.service';
import { MatCardModule } from '@angular/material/card';
import { IesaCommonAngularPersistService } from 'iesa-common-angular-persist';
import { LoginAccessService } from './login.access.service';
import { Router } from '@angular/router';
import { TucoholmesLibraryComponent } from '../../../../projects/tucoholmes-library/src/public-api';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, TucoholmesLibraryComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent {
  public undefinedObject!: UndefinedObjectData;
  @ViewChild('tuco') public tucoCr!:TucoholmesLibraryComponent;
  constructor(
    private readonly accessService: TestPageAccessService,
    private readonly persister: IesaCommonAngularPersistService,
    private readonly loginAccessService: LoginAccessService,
    private router: Router) {}




  public start():void{
    this.tucoCr.startTimmer();
  }
  public stopRecord():void{
    this.tucoCr.stopRecord();
  }

  public startScreen():void{
    this.tucoCr.recordScreen();
  }
  //#region Llamadas http
  public getBasicData(): void {
    this.accessService.getBasicData();
  }

  public generate400NetworkError(): void {
    this.accessService.generate400NetworkError();
  }

  public generate401NetworkError(): void {
    this.accessService.generate401NetworkError();
  }

  public generate500NetworkError(): void {
    this.accessService.generate500NetworkError();
  }

  public getImg():void{
    this.accessService.getImg();
  }

  public getCss():void{
    this.accessService.getCss();
  }

  public generateOkPostGFcloud():void{
    const loginRequest: any = {
      User: "gonzalo.carmenado@iesa.es",
      Password: "123456",
      Invitations: false,
      LoginType: '1',
      Program: 4,
  };
    this.loginAccessService.getTokkenFromTcLogin(loginRequest);
  }
  //#endregion Llamadas http

  //#region Consola
    public generateConsoleLog(id:number):void{
      if(id === 0){
        console.log('Hola caracola')
      }else if (id === 1){
        console.log('Adiós mejillón')
      }

    }

    public setValueToUndefined(): void {
      this.undefinedObject.name = 'Fallo en nombre ';
    }
  //#endregion Consola

  //#region Generar LocalStorage
  public generateLocalStorage():void{
    let user:any = {
      name: 'Gonzalo',
      lastName: 'Carmenado',
      age: 30
    }
    this.persister.set('user', user);
  }
  //#endregion Generar LocalStorage

  //#region Ayudante ia
  public goToForm():void{
    this.router.navigate(['/ai-form']);
  }
  //#endregion Ayudante ia
}
