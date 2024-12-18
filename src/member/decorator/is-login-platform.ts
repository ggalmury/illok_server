import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

import { LoginPlatform } from "@src/member/type/login-platform";

const IsLoginPlatform = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isLoginPlatform",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _) {
          return Object.values(LoginPlatform).includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `지원하지 않는 로그인 채널입니다. [요청 채널: ${args.property}]`;
        },
      },
    });
  };
};

export default IsLoginPlatform;
