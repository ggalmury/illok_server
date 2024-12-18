import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

import { Role } from "@src/role/type/role";

const IsRole = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isRole",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _) {
          return Object.values(Role).includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `잘못된 권한 역할입니다. [요청 권한: ${args.property}]`;
        },
      },
    });
  };
};

export default IsRole;
