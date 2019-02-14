import { Repository, getManager } from 'typeorm';
import { User } from '../entity';

interface UserRepoInterface extends Repository<User> {
  // 계정 정보를 조회하는 함수
  getUserByEmail?: (email: string) => Promise<User | undefined>;
  // 이메일이 존재하는지 확인하는 함수
  existUserEmail?: (email: string) =>Promise<boolean>;
};


const userRepo = (): UserRepoInterface => {
  const repo: UserRepoInterface = getManager().getRepository(User);

  repo.getUserByEmail = async (email: string) => repo.findOne({ email });

  repo.existUserEmail = async (email: string) => {
    const user = await repo.findOne({ email }) || null;

    if (user !== null) {
      return true;
    } else {
      return false;
    }
  }

  return repo;
}

export default userRepo;
