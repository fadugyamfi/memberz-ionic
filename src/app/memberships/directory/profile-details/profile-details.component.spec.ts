import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfileDetailsComponent } from './profile-details.component';

describe('ProfileDetailsComponent', () => {
    let component: ProfileDetailsComponent;
    let fixture: ComponentFixture<ProfileDetailsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileDetailsComponent],
            
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
