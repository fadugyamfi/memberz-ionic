import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DiscoverPage } from './discover.page';

describe('DiscoverPage', () => {
    let component: DiscoverPage;
    let fixture: ComponentFixture<DiscoverPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ExploreContainerComponentModule, DiscoverPage]
}).compileComponents();

        fixture = TestBed.createComponent(DiscoverPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
