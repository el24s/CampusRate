import { Test, TestingModule } from '@nestjs/testing';
import { RatedPlaceController } from './rated-place.controller';

describe('RatedPlaceController', () => {
  let controller: RatedPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatedPlaceController],
    }).compile();

    controller = module.get<RatedPlaceController>(RatedPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
