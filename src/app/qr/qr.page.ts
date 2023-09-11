import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  title = 'scanner';
  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  qrResultString!: string;
  qrResult!: Result;
  currentDevice!: MediaDeviceInfo;

  allowedFormats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    this.qrResultString = resultString;

    this.router.navigate(['/home'], {
      queryParams: { informacionQR: resultString },
    });
  }
  
}
