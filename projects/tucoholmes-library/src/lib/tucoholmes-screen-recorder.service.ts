import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  public async startRecording(): Promise<void> {
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: true
      });
      this.recordScreen(stream);
    } catch (err) {
      console.error('Error al intentar capturar la pantalla:', err);
    }
  }

  public stopRecording(): Blob | null {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      return new Blob(this.recordedChunks, { type: 'video/webm' });
    }
    return null;
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
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'screen_recording.webm';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    this.mediaRecorder.start();
    console.log('Grabación de pantalla iniciada');
  }
}
