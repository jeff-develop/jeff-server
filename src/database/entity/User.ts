import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import ScheduleType from "./ScheduleType";
import ScheduleLog from "./ScheduleLog";

@Entity({ name: 'user' })
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'email', length: 255 })
  email!: string;

  @Column({ name: 'password', length: 255 })
  password!: string;

  @Column({ name: 'name', length: 255 })
  name!: string;

  @OneToMany(type => ScheduleType, scheduleType => scheduleType.user)
  scheduleTypes!: ScheduleType[]; // 스케줄 타입

  @OneToMany(type => ScheduleLog, scheduleLog => scheduleLog.user)
  scheduleLogs!: ScheduleLog[]; // 스케줄 로그
}

export default User;
