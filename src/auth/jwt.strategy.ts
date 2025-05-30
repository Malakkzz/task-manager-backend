import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


//extracts token from Authorization:Bearer<token> and validates and makes userId available in protected routes
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret', // Same as in JwtModule
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
