import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    //hashes the pass with bcrypt, creates new user, and saves it to db
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hashedPassword });
    await this.userRepo.save(user);
    return { message: 'Signup successful' };
  }

  async login(email: string, password: string) {
    //verifies if user of this email exists or not and returns the JWT token
    const user = await this.userRepo.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id });
    return { access_token: token };
  }

  async validateUser(userId: number) {
    return this.userRepo.findOneBy({ id: userId });
  }
}
