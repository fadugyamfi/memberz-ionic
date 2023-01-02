/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-card-scanner',
  templateUrl: './card-scanner.component.html',
  styleUrls: ['./card-scanner.component.scss'],
})
export class CardScannerComponent implements OnInit {

  @ViewChild('ionModal', { static: true }) modal: IonModal;
  @ViewChild('scanner', { static: false }) scanner: NgxScannerQrcodeComponent;

  public captures = [];
  public capturing = false;
  public scanning = false;
  public open = true;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() scan: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.scanner.start(), 100);
  }

  async hideScanner() {
    this.modal.dismiss(null, 'cancel');
    this.scanner.stop();
    this.close.emit();
  }

  async onCodeScanned(code: ScannerQRCodeResult) {
    this.scan.emit(code.data);
  }

  onWillDismiss(event) {

  }
}
