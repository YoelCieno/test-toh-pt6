import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;
  let serviceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

});