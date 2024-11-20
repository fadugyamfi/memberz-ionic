import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardScannerComponent } from './card-scanner.component';

describe('CardScannerComponent', () => {
    let component: CardScannerComponent;
    let fixture: ComponentFixture<CardScannerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardScannerComponent],
            
        }).compileComponents();

        fixture = TestBed.createComponent(CardScannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
