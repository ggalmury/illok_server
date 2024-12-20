import { IsNotEmpty } from "class-validator";

import { Visibility } from "../type/visibility";
import IsVisibility from "../decorator/is-visibility";

export default class CreateMemberDto {
  @IsNotEmpty()
  @IsVisibility()
  readonly visibility: Visibility;

  constructor(visibility: Visibility) {
    this.visibility = visibility;
  }
}
