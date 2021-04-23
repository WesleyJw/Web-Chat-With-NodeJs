import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string){
        
        // user exists ?
        const userExists = await this.usersRepository.findOne({
            email
        })

        // user don't exist ? Save on /DB
        if (userExists) {
            return userExists;
        }

        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        //If user exists, return user
        return user;
    }

    async findByEmail(email: string){
        const user = this.usersRepository.findOne({ email });

        return user;
    }
}

export { UsersService };