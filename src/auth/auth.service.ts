import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from './enum/role.enum';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    private users = [
        { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10), role: Role.USER },
        { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10), role: Role.ADMIN },
        { id: 3, username: 'user3', password: bcrypt.hashSync('password3', 10), role: Role.USER },
    ];

    async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find((u) => u.username === username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result; 
        }
        throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe invalide');
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
