import { Injectable } from '@nestjs/common'
import { fromEvent, Observable } from 'rxjs'
import { EventEmitter } from 'events'

export interface StatusEventData {
  data: {
    requireRefresh: boolean
  }
}

@Injectable()
export class StatusEventService {
  private readonly events = new EventEmitter()

  public emitEvent (value: StatusEventData): void {
    this.events.emit('status', value)
  }

  public createObserver (): Observable<StatusEventData> {
    return fromEvent(this.events, 'status') as Observable<StatusEventData>
  }
}
