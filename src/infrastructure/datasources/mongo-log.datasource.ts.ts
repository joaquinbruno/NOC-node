import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource{

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo log created', newLog.id );
    }
    async getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]> {
       
        const logs = await LogModel.find({
            level: severyLevel
        });

        return logs.map( mongoLog => LogEntity.fromObject(mongoLog))

    }

}