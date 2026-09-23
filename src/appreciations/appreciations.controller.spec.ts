import { Test, TestingModule } from '@nestjs/testing';
import { AppreciationssController } from './Appreciationss.controller';

describe('AppreciationsController', () => {
  let controller: AppreciationssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppreciationssController],
    }).compile();

    controller = module.get<AppreciationssController>(AppreciationssController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
