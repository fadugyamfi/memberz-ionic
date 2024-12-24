import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { EventsPage } from './events.page';

describe('EventsPage', () => {
    let component: EventsPage;
    let fixture: ComponentFixture<EventsPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ExploreContainerComponentModule, EventsPage]
}).compileComponents();

        fixture = TestBed.createComponent(EventsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
