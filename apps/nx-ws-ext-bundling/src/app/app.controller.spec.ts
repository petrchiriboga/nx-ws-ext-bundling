import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommercetoolsService } from './commercetools.service';

describe('AppController', () => {
  let appController: AppController;
  let commercetoolsService: CommercetoolsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [AppController],
      providers: [CommercetoolsService],
    }).compile();

    appController = app.get<AppController>(AppController);
    commercetoolsService = app.get<CommercetoolsService>(CommercetoolsService);
  });

  describe('getData', () => {
    it('should return customers', async () => {
      const mockCustomers = [
        { id: '1', email: 'test@example.com' },
        { id: '2', email: 'test2@example.com' },
      ];

      jest.spyOn(commercetoolsService, 'getCustomers').mockResolvedValue(mockCustomers);

      const result = await appController.getData();
      expect(result).toEqual(mockCustomers);
      expect(commercetoolsService.getCustomers).toHaveBeenCalledWith();
    });
  });
});
