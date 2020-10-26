import { InjectionToken } from "@angular/core";

export const REALTIME_URL_TOKEN = new InjectionToken<string>('realtime_url');
export const REST_URL_TOKEN = new InjectionToken<string>('rest_url');

export const REST_URL = "http://chat.internal.xomad.com"
export const REALTIME_URL = "ws://chat.internal.xomad.com/websocket"