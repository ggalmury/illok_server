import { IsNotEmpty } from "class-validator";

import { Visibility } from "../types/visibility";
import IsVisibility from "../decorators/is-visibility";

export default class CreateMemberDto {
  @IsNotEmpty()
  @IsVisibility()
  readonly visibility: Visibility;

  constructor(visibility: Visibility) {
    this.visibility = visibility;
  }
}
