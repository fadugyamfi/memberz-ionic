import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventSessionPage } from './event-session.page';

describe('EventSessionPage', () => {
    let component: EventSessionPage;
    let fixture: ComponentFixture<EventSessionPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EventSessionPage],
            
        }).compileComponents();

        fixture = TestBed.createComponent(EventSessionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
