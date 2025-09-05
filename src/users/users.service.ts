import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByUsername(createUserDto.email);
    
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    return await this.prisma.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        accountCreationDate: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string) {
    return await this.prisma.users.findUnique({ 
      where: { 
        username: username 
      }
    });
  }
}
