import { InjectionToken } from "@angular/core";

export const REALTIME_URL_TOKEN = new InjectionToken<string>('realtime_url');
export const REST_URL_TOKEN = new InjectionToken<string>('rest_url');

export const REST_URL = "http://192.168.10.116:3000"
export const REALTIME_URL = "ws://192.168.10.116:3000/websocket"