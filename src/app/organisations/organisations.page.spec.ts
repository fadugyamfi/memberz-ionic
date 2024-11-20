import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrganisationsPage } from './organisations.page';

describe('OrganisationsPage', () => {
    let component: OrganisationsPage;
    let fixture: ComponentFixture<OrganisationsPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrganisationsPage],
            
        }).compileComponents();

        fixture = TestBed.createComponent(OrganisationsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
