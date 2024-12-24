import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GroupsComponent } from './groups.component';

describe('GroupsComponent', () => {
    let component: GroupsComponent;
    let fixture: ComponentFixture<GroupsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [GroupsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(GroupsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
