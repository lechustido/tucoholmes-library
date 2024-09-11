import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestPageAccessService {

  constructor(private http: HttpClient) { }

  public getBasicData() {
    const url = 'https://dummy.restapiexample.com/api/v1/employees';

    this.http.get(url).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    });
  }
  public generate400NetworkError() {
    const url = 'https://httpbin.org/status/400';

    this.http.get(url).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    });
  }

  public generate401NetworkError() {
    const url = 'https://api.iesa.es/publications/api/v1.0/Publicity/publicitiesByProvince?idProvincia[eq]=0&PublicityType[eq]=1&limit[eq]=3&offset[eq]=0&order_by=-cp';

    this.http.get(url).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    });
  }

  public generate500NetworkError() {
    const url = 'https://httpbin.org/status/500';

    this.http.get(url).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    });
  }

  public getImg():void{
    const imageUrl = 'https://gfcloud-db73.kxcdn.com/gfcloud/images/avatars/planta.png';

    this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'planta.png';  // Nombre sugerido para el archivo descargado
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  public getCss():void{
    const cssUrl = 'https://gfcloud-db73.kxcdn.com/gfcloud/compiled/mainTheme.css';

    this.http.get(cssUrl, { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mainTheme.css';  // Nombre sugerido para el archivo descargado
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
