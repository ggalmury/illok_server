import SignUpReqDto from "@src/auth/dtos/request/sign-up-req.dto";
import TokenResDto from "@src/auth/dtos/response/token.res.dto";

export default interface SignUpUsecase {
  execute(signUpReqDto: SignUpReqDto): Promise<TokenResDto>;
}
