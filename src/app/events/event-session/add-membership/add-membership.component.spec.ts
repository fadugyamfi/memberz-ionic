import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddMembershipComponent } from './add-membership.component';

describe('AddMembershipComponent', () => {
    let component: AddMembershipComponent;
    let fixture: ComponentFixture<AddMembershipComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AddMembershipComponent],
            
        }).compileComponents();

        fixture = TestBed.createComponent(AddMembershipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
