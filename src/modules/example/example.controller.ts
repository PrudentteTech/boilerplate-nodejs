import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TestController, TestControllerResponse } from './dtos/test-controller.dto';
import { ExampleService } from './example.service';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'Descrição' })
  @ApiResponse({ status: 200, type: TestControllerResponse })
  @Get('/teste')
  test(@Body() data: TestController): TestControllerResponse {
    return data;
  }
}
