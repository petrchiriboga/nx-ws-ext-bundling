import { Controller, Get } from '@nestjs/common';
import { CommercetoolsService } from './commercetools.service';

@Controller()
export class AppController {
  constructor(private readonly commercetoolsService: CommercetoolsService) {}

  @Get()
  async getData() {
    return await this.commercetoolsService.getCustomers();
  }
}
