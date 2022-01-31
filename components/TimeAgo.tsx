import { useMemo, useState, useEffect } from 'react'
import dateToRelativeTime from 'utils/dateToRelativeTime'

interface TimeUnits {
  [key: string]: number
}

const TIME_UNITS: TimeUnits = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
}

const getTimeUnit = (relativeTime: string) => {
  if (relativeTime === 'now') return TIME_UNITS.second

  const regex = /second|minute|hour/

  const match = relativeTime.match(regex)

  return match ? TIME_UNITS[match[0]] : null
}

interface TimeAgoProps {
  date: string
}

const TimeAgo = ({ date }: TimeAgoProps) => {
  const parsedDate = useMemo(() => new Date(date), [date])
  const dateISO = useMemo(() => parsedDate.toISOString(), [parsedDate])
  const [relativeTime, setRelativeTime] = useState(
    dateToRelativeTime(parsedDate)
  )

  useEffect(() => {
    const time = getTimeUnit(relativeTime)

    if (!time) return

    const timeout = setTimeout(
      () => setRelativeTime(dateToRelativeTime(parsedDate)),
      time
    )

    return () => clearTimeout(timeout)
  }, [parsedDate, relativeTime])

  return <time dateTime={dateISO}>{relativeTime}</time>
}

export default TimeAgo
