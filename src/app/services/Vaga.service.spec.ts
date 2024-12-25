/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VagaService } from './Vaga.service';

describe('Service: Vaga', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VagaService]
    });
  });

  it('should ...', inject([VagaService], (service: VagaService) => {
    expect(service).toBeTruthy();
  }));
});
