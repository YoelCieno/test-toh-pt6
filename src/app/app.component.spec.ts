import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
    let app: AppComponent;
    let de: DebugElement;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        });
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        de = fixture.debugElement;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(app).toBeTruthy();
    });

    it('should render title in an h1 tag', () => {
        expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('Tour of Heroes');
    });

    it(`should have as title 'Tour of Heroes'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Tour of Heroes');
    }));

    it('should display 3 links', async(() => {
        expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(3);
    }));
});