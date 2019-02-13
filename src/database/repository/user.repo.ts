import { Repository, getManager } from 'typeorm';
import { User } from '../entity';

interface UserRepoInterface extends Repository<User> {
  // 계정 정보를 조회하는 함수
  getUserByEmail?: (email: string) => Promise<User | undefined>;
};


const userRepo = (): UserRepoInterface => {
  const repo: UserRepoInterface = getManager().getRepository(User);

  repo.getUserByEmail = async (email: string) => repo.findOne({ email });

  return repo;
}

export default userRepo;
