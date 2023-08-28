import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/shared/service/data.service';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss']
})
export class QrCodeScannerComponent implements OnInit {

  model: {
    toPhone: string,
    name: string,
    amount: number,
    content: string,
    checkSave: boolean
  } = {
      toPhone: null,
      name: null,
      amount: null,
      content: null,
      checkSave: false
    };

  data: any;

  canvasElement: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  canvasElement1: HTMLCanvasElement;
  canvasContext1: CanvasRenderingContext2D;
  outputContainer: HTMLDivElement;
  outputMessage: HTMLDivElement;
  outputData: HTMLDivElement;
  video: HTMLVideoElement;
  code: any = null;
  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  result: any;

  ngOnInit() {
    this.canvasElement1 = (document.getElementById('scan-canvas-1') as HTMLCanvasElement);
    this.canvasContext1 = this.canvasElement1.getContext('2d');
    this.canvasElement = (document.getElementById('scan-canvas') as HTMLCanvasElement);
    this.canvasContext = this.canvasElement.getContext('2d');
    this.outputContainer = (document.getElementById('output') as HTMLDivElement);
    this.outputMessage = (document.getElementById('outputMessage') as HTMLDivElement);
    this.outputData = (document.getElementById('outputData') as HTMLDivElement);
    this.video = (document.createElement('video') as HTMLVideoElement);
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      }
    }).then(async (stream: MediaStream) => {
      this.video.srcObject = stream;
      this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
      await this.video.play();
      requestAnimationFrame(this.tick.bind(this));
    });
  }

  tick(): void {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvasElement.hidden = false;
      this.outputContainer.hidden = false;
      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvasContext.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData: ImageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code: QRCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        alert(JSON.stringify(code.data));
      }
    }
    requestAnimationFrame(this.tick.bind(this));
  }

  handleBack() {
    this.router.navigate([`./transfer-to-umoney/start`]);
  }

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        this.canvasElement1.width = img.width;
        this.canvasElement1.height = img.height;
        this.canvasContext1.drawImage(img, 0, 0);
        const qrData = this.canvasContext1.getImageData(0, 0, this.canvasElement1.width, this.canvasElement1.height);
        this.code = jsQR(qrData.data, qrData.width, qrData.height);

        if (this.code) {
          this.data = {
            toPhone: this.model.toPhone,
            amount: this.model.amount
          };
          this.dataService.changeMessage(this.data);
          this.router.navigate([`./transfer-to-umoney/start`]);
        }
        else {
          alert('Mã qr không hợp lệ hoặc hình ảnh k đủ sắc nét. Vui lòng chọn lại!!!!');
        }
      };
      img.src = event.target.result as string;
    };
    reader.readAsDataURL(files[0]);
  }
}
