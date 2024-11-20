import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrganisationPage } from './organisation.page';

describe('OrganisationPage', () => {
    let component: OrganisationPage;
    let fixture: ComponentFixture<OrganisationPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrganisationPage],
            
        }).compileComponents();

        fixture = TestBed.createComponent(OrganisationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
