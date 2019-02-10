import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";
import User from "./User";
import ScheduleType from "./ScheduleType";

@Entity({ name: 'schedule_log' })
class ScheduleLog {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ name: "schedule_status", length: 100 })
  scheduleStatus!: string;

  @Column({ name: "record_time" })
  recordTime!: Date;

  @Column({ name: 'notification_cycle' })
  notificationCycle!: number;

  @ManyToOne(type => ScheduleType, scheduleType => scheduleType.id)
  @JoinColumn({ name: "schedule_type_id" })
  scheduleType!: ScheduleType;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User; // 사용자
}

export default ScheduleLog;
