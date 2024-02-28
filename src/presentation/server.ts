import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from './email/email-service';
import { SendEmailLogs } from "../domain/use-cases/email/send-mail-logs";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource.ts";
import { LogSeverityLevel } from "../domain/entities/log.entity";

const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new MongoLogDataSource()
)

const emailService = new EmailService();


export class Server {

    public static async start(){
        console.log('Server started..')
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs)
        // :D Hi!

    //    new SendEmailLogs(
    //     emailService,
    //     logRepository
    //     ).execute(
    //         ['joaquinbruno.93@gmail.com', 'joaquinbruno.93@gmail.com']
    //     )

        // CronService.CreateJob(
        //     '*/5 * * * * *',
        //     () => {

        //         const url = 'http://asdasddsa.com';
        //         new CheckService(
        //             logRepository,
        //             () => console.log( `${url} is ok`),
        //             ( error) => console.log( error ),

        //         ).execute(url)
                
        //     }
        // );
  
    }
}