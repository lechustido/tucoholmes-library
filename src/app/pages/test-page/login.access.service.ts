import { Injectable } from '@angular/core';
import { ResponseMessage, ResponseMessageList } from 'iesa-common-angular-rest';
import {
    IESATCAngularConnectorSRVSecurityService,
    LoginRequestNulableModel,
} from 'iesa-tc-angular-connector-srvsecurity';
import { environment } from '../../../environments/environment';
import { IesaPersisterService } from '../../services/iesa-persister.service';
import {
    IesaTcAngularConnectorSrvtcsecurityService,
    NewPasswordRequestModel,
} from 'iesa-tc-angular-connector-srvtcsecurity';
import {
    CredencialResponseModel,
    ProfilesResponseModel,
} from 'iesa-tc-angular-connector-srvgeneral';

@Injectable({
    providedIn: 'root',
})
export class LoginAccessService {
    constructor(
        private securityService: IESATCAngularConnectorSRVSecurityService,
        private securityServiceT: IesaTcAngularConnectorSrvtcsecurityService,
        private readonly iesaPersisterService: IesaPersisterService
    ) {}

    /**
     * Valida los datos recibidos del formulario y devuelve el token asignado a esta sesión del usuario
     * @param {LoginRequestNulableModel} loginRequest
     * @return {Promise<ResponseMessage<string>>}
     * @memberof LoginAccessService
     */
    public getTokkenFromTcLogin(
        loginRequest: LoginRequestNulableModel
    ): Promise<ResponseMessage<string>> {
        return new Promise((resolve, reject) => {
            //Eliminar el any cuando se modifique el servicio
            this.securityService
                .loginMsNew(loginRequest, environment.SecurityNew)
                .then((loginResponse: any) => {
                    if (loginResponse.statusCode === 200) {
                        this.iesaPersisterService.setUserTokken(
                            loginResponse.data.Token
                        );
                        this.setCredentialsFromTcLogin()
                            .then(() => {
                                this.iesaPersisterService.setUserTokken(
                                    loginResponse.data.Token
                                );
                                resolve(loginResponse);
                            })
                            .catch((setCredentialsError: string) => {
                                reject(setCredentialsError);
                            });
                    } else {
                        reject(loginResponse.message);
                    }
                })
                .catch((loginResponseError: any) => {
                    reject(loginResponseError);
                });
        });
    }
    /**
     * Permite definir la credencial en la API mediante un get (no devuelve nada, solo si ha sido exitoso o no)
     * @return {Promise<boolean>}
     * @memberof LoginAccessService
     */
    public setCredentialsFromTcLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.securityServiceT
                .getCredential(environment.SecurityNew)
                .then(
                    (
                        credentialsResponse: ResponseMessageList<CredencialResponseModel>
                    ) => {
                        if (credentialsResponse.statusCode === 200) {
                            this.iesaPersisterService.setCredential(
                                credentialsResponse.data
                            );
                            resolve(true);
                        } else {
                            reject(credentialsResponse.message);
                        }
                    }
                );
        });
    }

    /**
     * Obtienelos perfiles de tipo 5 (empresa) del usuario logeado.
     * @memberof LoginAccessService
     */
    public getProfilesFromTcLogin(): Promise<Array<ProfilesResponseModel>> {
        return new Promise((resolve, reject) => {
            const profileFilters: any = {};
            profileFilters.lstProfiles = ['5'];
            profileFilters.program = 4;
            this.securityService
                .getProfilesFilter(profileFilters, environment.SecurityNew)
                .then((profilesResponse: any) => {
                    if (profilesResponse.statusCode === 200) {
                        resolve(profilesResponse.data);
                    } else {
                        reject(profilesResponse.message);
                    }
                })
                .catch((exception: any) => {
                    reject('Error al hacer login');
                });
        });
    }
    /**
     * Al seleccionar un perfil del usuario, setea la credencial (al igual que hicimos con el usuario) del perfil
     * @param {number} profileId
     * @return {Promise<boolean>}
     * @memberof LoginAccessService
     */
    public setkeyProfileFromTcLogin(profileId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.securityServiceT
                .setProfileKey(environment.SecurityNew, profileId.toString())
                .then((keyProfile: any) => {
                    if (keyProfile.statusCode === 200) {
                        this.setCredentialsFromTcLogin()
                            .then(() => {
                                resolve(true);
                            })
                            .catch(() => resolve(false));
                    } else {
                        reject(keyProfile.message);
                    }
                });
        });
    }
    /**
     * Envia al usuario un email con cambio de contraseña al email indicado en el parametro data
     * @param {NewPasswordRequestModel} data
     * @return {*}  {Promise<boolean>}
     * @memberof LoginAccessService
     */
    public generateNewPassword(
        userData: NewPasswordRequestModel
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.securityServiceT
                .requestPassword(environment.SecurityNew, userData)
                .then((keyProfile: any) => {
                    if (keyProfile) {
                        resolve(true);
                    } else {
                        reject(keyProfile.message);
                    }
                }).catch(
                  (errorData:any) =>{
                    if(errorData.HttpCode === 403){
                      reject(errorData.Message);
                    }
                  }
                );
        });
    }
}
