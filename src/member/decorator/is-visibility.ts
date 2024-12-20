import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

import { Visibility } from "@src/member/type/visibility";

const IsVisibility = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isVisibility",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _) {
          return Object.values(Visibility).includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `프로필 공개 여부가 올바르지 않습니다. [요청 공개 여부: ${args.property}]`;
        },
      },
    });
  };
};

export default IsVisibility;
