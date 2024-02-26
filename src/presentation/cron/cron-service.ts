import { CronJob } from "cron"

type Crontime = string | Date;
type OnTick = () => void;

export class CronService {

    static CreateJob(cronTime: Crontime, onTick: OnTick): CronJob {
        const job = new CronJob(cronTime, onTick) ;

        job.start();

        return job;
    }
}