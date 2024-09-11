import { Injectable } from "@angular/core";
import { IesaCommonAngularPersistService } from "iesa-common-angular-persist";
import { CredencialResponseModel, UserTCResponseModel } from 'iesa-tc-angular-connector-srvgeneral';

@Injectable({
    providedIn: 'root'
})
export class IesaPersisterService {

    constructor(
        private readonly persister: IesaCommonAngularPersistService,
    ) {

    }

    public setUserTokken(userTokken: string): void {
        this.persister.set('user', { token: userTokken });
    }

    public setCredential(credential: CredencialResponseModel): void {
        this.persister.set('credencial', credential);
    }

    public setActualUser(user: UserTCResponseModel): void {
        this.persister.set('usuarioActual', user);
    }
}