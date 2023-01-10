import { Injectable } from '@nestjs/common'
import { fromEvent, Observable } from 'rxjs'
import { EventEmitter } from 'events'

export interface AccidentsEventData {
  data: {
    requireRefresh: boolean
  }
}

@Injectable()
export class AccidentsEventService {
  private readonly events = new EventEmitter()

  public emitEvent (value: AccidentsEventData): void {
    this.events.emit('accidents', value)
  }

  public createObserver (): Observable<AccidentsEventData> {
    return fromEvent(this.events, 'accidents') as Observable<AccidentsEventData>
  }
}
