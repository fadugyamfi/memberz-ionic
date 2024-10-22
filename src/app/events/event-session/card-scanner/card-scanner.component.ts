/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';

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

  constructor(
    private modalBackButton: ModalBackButtonService
  ) { }

  ngOnInit() {
    setTimeout(() => this.scanner.start(), 100);
    this.modalBackButton.pushModalState();
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.hideScanner();
  }

  ngOnDestroy(): void {
    this.modalBackButton.clearModalState();
  }

  async hideScanner() {
    this.modal.dismiss(null, 'cancel');
    this.scanner.stop();
    this.close.emit();
  }

  async onCodeScanned(codes: ScannerQRCodeResult[]) {
    codes.forEach(code => this.scan.emit(code.decode()));
  }

  onWillDismiss(event) {

  }
}
