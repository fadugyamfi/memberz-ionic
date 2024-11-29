import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AnniversariesComponent } from './anniversaries.component';

describe('AnniversariesComponent', () => {
    let component: AnniversariesComponent;
    let fixture: ComponentFixture<AnniversariesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [AnniversariesComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AnniversariesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
