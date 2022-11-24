import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TestController {
  @ApiProperty()
  @IsString()
  info: string;
}
export class TestControllerResponse {
  @ApiProperty()
  @IsString()
  info: string;
}
