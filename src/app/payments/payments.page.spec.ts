import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PaymentsPage } from './payments.page';

describe('PaymentsPage', () => {
    let component: PaymentsPage;
    let fixture: ComponentFixture<PaymentsPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ExploreContainerComponentModule, PaymentsPage]
}).compileComponents();

        fixture = TestBed.createComponent(PaymentsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
