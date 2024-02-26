interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (err: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly succesCallBack: SucessCallback,
        private readonly errorCallBack: ErrorCallback,
    ) {}

    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }
            this.succesCallBack();
            return true;
        } catch (error) {
            this.errorCallBack(`${error}`);
            console.log(`${error}`)
            return false;

        }
    }
}