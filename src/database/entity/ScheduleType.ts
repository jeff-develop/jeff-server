import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import User from "./User";
import ScheduleLog from "./ScheduleLog";

@Entity({ name: "schedule_type" })
class ScheduleType {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ name: "schedule_name", length: 100 })
  scheduleName!: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User; // 사용자

  @OneToMany(type => ScheduleLog, scheduleLog => scheduleLog.scheduleType)
  scheduleLogs!: ScheduleLog[]; // 스케줄 로그
}

export default ScheduleType;
