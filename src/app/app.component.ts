import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TucoholmesConsoleService } from '../../projects/tucoholmes-library/src/lib/tucoholmes-console.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tucoholmes-main-library';
  private originalConsoleLog = console.log;   // Almacena referencia a console.log
  private originalConsoleError = console.error;
  constructor(private consoleLoggerService: TucoholmesConsoleService){

  }

  public ngOnInit(): void {


    console.log = (...args: any) => {
      this.consoleLoggerService.recordConsoleLog(args); // Llama al método del servicio
      this.originalConsoleLog.apply(console, args); // Usa la referencia original
    };

    console.error = (...args: any[]) => {
      this.consoleLoggerService.recordConsoleError(args.join(' ')); // Llama al método del servicio
      this.originalConsoleError.apply(console, args); // Usa la referencia original
    };
  }
}
