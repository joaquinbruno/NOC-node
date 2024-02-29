import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prismaClient = new PrismaClient();

const severyEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}


export class PostgressLogDatasource implements LogDataSource{
    
    
    
    
    
    async saveLog(log: LogEntity): Promise<void> {

        const level = severyEnum[log.level]

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        })

        console.log('Posgres Save')

    }
    async getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severyEnum[severyLevel]

        const dbLogs = await prismaClient.logModel.findMany({
            where:{
                level
            }
        });

        return dbLogs.map(LogEntity.fromObject)
    }

}