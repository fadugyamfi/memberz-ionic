/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-card-scanner',
  templateUrl: './card-scanner.component.html',
  styleUrls: ['./card-scanner.component.scss'],
})
export class CardScannerComponent implements OnInit {

  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent;

  public captures = [];
  public capturing = false;
  public scanning = false;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() scan: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.scanner.start(), 100);
  }

  async hideScanner() {
    this.scanner.stop();
    this.close.emit();
  }

  async onCodeScanned(code: ScannerQRCodeResult) {
    this.scan.emit(code.data);
  }

}
