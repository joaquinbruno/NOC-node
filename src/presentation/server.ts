import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from "./cron/cron-service"
import { EmailService } from './email/email-service';
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource.ts";
import { PostgressLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)

const mongoLogRePository = new LogRepositoryImpl(
    new MongoLogDataSource(),
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgressLogDatasource()
)

const emailService = new EmailService();


export class Server {

    public static async start(){
        console.log('Server started..')
        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs)
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

        //         const url = 'http://google.com';
        //         new CheckServiceMultiple(
        //             [fsLogRepository, postgresLogRepository, mongoLogRePository],
        //             () => console.log( `${url} is ok`),
        //             ( error) => console.log( error ),

        //         ).execute(url)
                
        //     }
        // );
  
    }
}