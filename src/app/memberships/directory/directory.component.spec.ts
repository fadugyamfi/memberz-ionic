import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DirectoryComponent } from './directory.component';

describe('DirectoryComponent', () => {
    let component: DirectoryComponent;
    let fixture: ComponentFixture<DirectoryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [DirectoryComponent],
}).compileComponents();

        fixture = TestBed.createComponent(DirectoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
