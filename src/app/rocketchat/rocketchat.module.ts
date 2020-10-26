import { InjectionToken, NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http'
import { RocketChatService } from "./rocketchat.service";
import { RealtimeApi } from "./realtime-api";
import { RestApi } from "./rest-api";
import { REST_URL, REALTIME_URL, REALTIME_URL_TOKEN, REST_URL_TOKEN} from './config'

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: REALTIME_URL_TOKEN,
            useValue: REALTIME_URL
        }, 
        {
            provide: REST_URL_TOKEN,
            useValue: REST_URL
        }, 
        RestApi,
        RealtimeApi, 
        RocketChatService
    ],
})
export class RocketChatModule {

}