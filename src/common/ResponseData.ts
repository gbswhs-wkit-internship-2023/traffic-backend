export interface ResData<T = {}> {
  data?: T
  reason?: string
  success: boolean
}

export type PResData<T = {}> = Promise<ResData<T>>
