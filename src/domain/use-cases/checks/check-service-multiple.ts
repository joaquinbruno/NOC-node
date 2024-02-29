import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCallback = (() => void) | undefined;
type ErrorCallback = ((err: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly succesCallBack: SucessCallback,
        private readonly errorCallBack: ErrorCallback,
    ) { }

    private callLogs( log: LogEntity){
        this.logRepository.forEach ( logRepository => {
            logRepository.saveLog(log)
        })
    }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            })
            this.callLogs(log)
            this.succesCallBack && this.succesCallBack();
            return true;
        } catch (error) {

            const errorMessage = `${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            })
            this.callLogs(log);
            this.errorCallBack && this.errorCallBack(`${error}`);
            return false;

        }
    }
}