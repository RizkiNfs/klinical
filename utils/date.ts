import dayjsModule from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjsModule.locale('id')
dayjsModule.extend(isToday)

export const dayjs = dayjsModule