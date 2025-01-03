/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, OnInit, output, viewChild } from '@angular/core';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonSpinner } from '@ionic/angular/standalone';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';


@Component({
    selector: 'app-card-scanner',
    templateUrl: './card-scanner.component.html',
    styleUrls: ['./card-scanner.component.scss'],
    imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonSpinner, NgxScannerQrcodeModule]
})
export class CardScannerComponent implements OnInit {

    readonly modal = viewChild<IonModal>('ionModal');
    readonly scanner = viewChild<NgxScannerQrcodeComponent>('scanner');

    public captures = [];
    public capturing = false;
    public scanning = false;
    public open = true;

    readonly close = output();
    readonly scan = output<string>();

    constructor(
        private modalBackButton: ModalBackButtonService
    ) { }

    ngOnInit() {
        setTimeout(() => this.scanner().start(), 100);
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
        this.modal().dismiss(null, 'cancel');
        this.scanner().stop();
        this.close.emit();
    }

    async onCodeScanned(codes: ScannerQRCodeResult[]) {
        codes.forEach(code => this.scan.emit(code.decode()));
    }

    onWillDismiss(event) {

    }
}
