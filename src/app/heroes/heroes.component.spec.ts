import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeroesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /* it('Add a hero name', () => {
        const hero: Hero = { id: 42, name: 'Test' };
        component.add(hero.name);
        expect()
    }); */
});