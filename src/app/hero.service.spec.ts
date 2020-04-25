import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;
  let hero: Hero[] = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

  beforeEach(() => {
    const heroStub = { id: {} };
      const messageServiceStub = {
      messages: <Array<string>>[],
      add(message: string) {
        this.messages.push(message);
      }
    };
  
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: hero, useValue: heroStub },
        { provide: MessageService, useValue: messageServiceStub}
      ]
    });
    service = TestBed.get(HeroService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {

    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const heroStub: Hero = TestBed.get(hero);
      service.getHeroes().subscribe(res => {
        expect(res).toEqual([heroStub]);
      });
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      req.flush([heroStub]);
      httpTestingController.verify();

      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('fetched heroes');
    });

    it('handles an error', () => {
      service.getHeroes().subscribe(res => {
        expect(res).toEqual([]);
      });
      const httpTestingController = TestBed.get(HttpTestingController);
      const req = httpTestingController.expectOne('api/heroes');

      spyOn(console, 'error');

      req.flush('Error', { status: 404, statusText: 'Not Found' });

      expect(console.error).toHaveBeenCalled();
      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('Not Found');
    });
  });
  
  describe('getHero', () => {
    it('gets hero with http get', () => {
      const heroStub : Hero = TestBed.get(hero);
      const id = 123;
      service.getHero(id).subscribe(res => {
        expect(res).toEqual(heroStub);
      });

      const httpTestingController = TestBed.get(HttpTestingController);
      const req = httpTestingController.expectOne('api/heroes/123');
      expect(req.request.method).toEqual('GET');
      req.flush(heroStub);

      httpTestingController.verify();
      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('fetched hero');
    });
  });

  describe('addHero', () => {

    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const heroStub: Hero = TestBed.get(hero);
      service.addHero(heroStub).subscribe(res => {
        expect(res).toEqual(heroStub);
      })
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('POST');
      req.flush(heroStub);
      httpTestingController.verify();

      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('added hero');      
    });

    it('handles an error', () => {
      const heroStub: Hero = TestBed.get(hero);
      service.addHero(heroStub).subscribe(res => {
        expect(res).toEqual(undefined);
      });
      const httpTestingController = TestBed.get(HttpTestingController);
      const req = httpTestingController.expectOne('api/heroes');

      spyOn(console, 'error');

      req.flush('Error', { status: 404, statusText: 'Not Found' });

      expect(console.error).toHaveBeenCalled();
      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('Not Found');
    });
      
  });

  describe('updateHero', () => {

    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const heroStub: Hero = TestBed.get(hero);
      service.updateHero(heroStub).subscribe(res => {
        expect(res).toEqual(heroStub);
      });
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('PUT');
      req.flush(heroStub);
      httpTestingController.verify();

      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('updated hero');      
    });

    it('handles 404 error', () => {
      const heroStub: Hero = TestBed.get(hero);
      service.updateHero(heroStub).subscribe(res => {
        expect(res).toEqual(undefined);
      });

      const httpTestingController = TestBed.get(HttpTestingController);
      const req = httpTestingController.expectOne('api/heroes');

      spyOn(console, 'error');

      req.flush('Error', { status: 404, statusText: 'Not Found' });

      expect(console.error).toHaveBeenCalled();
      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain('Not Found');
    });

  });
});