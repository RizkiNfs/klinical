import dayjsModule from 'dayjs/esm'
import isToday from 'dayjs/esm/plugin/isToday'
dayjsModule.locale('id')
dayjsModule.extend(isToday)

export const dayjs = dayjsModule