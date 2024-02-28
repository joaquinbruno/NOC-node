import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from './email/email-service';
import { SendEmailLogs } from "../domain/use-cases/email/send-mail-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const emailService = new EmailService();
export class Server {

    public static start(){
        console.log('Server started..')
        
        
        // :D Hi!

       new SendEmailLogs(
        emailService,
        fileSystemLogRepository
        ).execute(
            ['joaquinbruno.93@gmail.com', 'joaquinbruno.93@gmail.com']
        )

        


        // CronService.CreateJob(
        //     '*/5 * * * * *',
        //     () => {

        //         const url = 'http://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log( `${url} is ok`),
        //             ( error) => console.log( error ),

        //         ).execute(url)
        //         // new CheckService().execute('http://localhost:3000')
        //     }
        // );
  
    }
}