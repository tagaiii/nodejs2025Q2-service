import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UnauthorizedValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    if (!value.refreshToken) {
      throw new UnauthorizedException('Missing refresh token!');
    }
    return value;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
