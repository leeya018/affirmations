import { formatSeconds } from "../util"

type TimerProps = {
  time: number
}
function Timer({ time }: TimerProps) {
  return <div className="font-semibold w-16">{formatSeconds(time)}</div>
}

export default Timer
