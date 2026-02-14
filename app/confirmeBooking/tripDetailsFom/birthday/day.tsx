type Props = {
  day: string
  month: string
  year: string
  onSelectDay: (day: string) => void
}

export default function BirthdayDay({
  day,
  month,
  year,
  onSelectDay,
}: Props) {

  const getDaysInMonth = () => {
    if (!month || !year) return []
    const totalDays = new Date(Number(year), Number(month), 0).getDate()
    return Array.from({ length: totalDays }, (_, i) => i + 1)
  }

  const days = getDaysInMonth()

  return (
    <select
      value={day}
      onChange={(e) => onSelectDay(e.target.value)}
      className="w-full outline-none bg-transparent"
      disabled={!month || !year}
    >
      <option value="">Day</option>
      {days.map(d => (
        <option key={d} value={d.toString()}>
          {d}
        </option>
      ))}
    </select>
  )
}
