import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class Encoder {
    encode(x : string): string {
        return btoa(x).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
    }
    decode(x: string): string {
        let y = x.replaceAll("-", "+").replaceAll("_", "/");
        while (y.length % 4 != 0) y += "=";
        return atob(y);
    }
}