import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenRecorderService {

  public messageSourceVideo: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentMessageVideo: Observable<string> = this.messageSourceVideo.asObservable();


  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  public async startRecording(): Promise<void> {
    try {
      this.stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: true
      });
      if(this.stream){
        this.recordScreen(this.stream);
      }

    } catch (err) {
      console.error('Error al intentar capturar la pantalla:', err);
    }
  }

  public stopRecording(): Blob | null {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.stopCapture();
     // return new Blob(this.recordedChunks, { type: 'video/webm' });
    }
    return null;
  }

  private stopCapture(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  private recordScreen(stream: MediaStream): void {
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp9'
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result as string;
        this.messageSourceVideo.next(base64data);

        // Aquí puedes manejar el base64data como necesites
      };

      reader.readAsDataURL(blob);
     /* const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'screen_recording.webm';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);*/
    };

    this.mediaRecorder.start();
    console.log('Grabación de pantalla iniciada');
  }
}
