import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'playDateFormat'
})

export class PlayDateFormatPipe implements PipeTransform {
    transform(value: string, format: 'day' | 'month' | 'time' | 'full' = 'full'): string {
        const date = new Date(value);

        switch(format) {
            case "day":
                return date.getDate().toString();
            case "month":
                return date.toLocaleString('en-US', {month: 'long'}).toLowerCase();
            case "time":
                return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
            case "full":
            default: 
                return date.toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                })
        }
    }
}