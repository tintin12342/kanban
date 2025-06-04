import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/task.model';

@Pipe({
  pure: true,
  name: 'statusEnumConverter',
})
export class StatusEnumConverterPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case Status.TO_DO:
        return 'To do';
      case Status.IN_PROGRESS:
        return 'In progress';
      case Status.DONE:
        return 'Done';
    }
    return 'Unknown status';
  }
}
