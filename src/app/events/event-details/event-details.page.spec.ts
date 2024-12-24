import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventDetailsPage } from './event-details.page';

describe('EventDetailsPage', () => {
    let component: EventDetailsPage;
    let fixture: ComponentFixture<EventDetailsPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [EventDetailsPage],
}).compileComponents();

        fixture = TestBed.createComponent(EventDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
