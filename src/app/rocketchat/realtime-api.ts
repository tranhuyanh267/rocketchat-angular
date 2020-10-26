import { Inject, Injectable } from '@angular/core'
import { RealTimeAPI } from 'rocket.chat.realtime.api.rxjs'
import { REALTIME_URL_TOKEN } from './config'

@Injectable()
export class RealtimeApi extends RealTimeAPI {

    constructor(@Inject(REALTIME_URL_TOKEN) webSocketUrl: string) {
        super(webSocketUrl)
    }

    spotlight(search: string) {
        return this.callMethod("spotlight", `${search}`, [], {
            "users": true,
            "rooms": false
        })
    }

}