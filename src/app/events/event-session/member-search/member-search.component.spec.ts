import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MemberSearchComponent } from './member-search.component';

describe('MemberSearchComponent', () => {
    let component: MemberSearchComponent;
    let fixture: ComponentFixture<MemberSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [MemberSearchComponent],
}).compileComponents();

        fixture = TestBed.createComponent(MemberSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
