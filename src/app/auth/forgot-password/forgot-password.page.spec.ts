import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ForgotPasswordPage } from './forgot-password.page';

describe('ForgotPasswordPage', () => {
    let component: ForgotPasswordPage;
    let fixture: ComponentFixture<ForgotPasswordPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ForgotPasswordPage],
}).compileComponents();

        fixture = TestBed.createComponent(ForgotPasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
