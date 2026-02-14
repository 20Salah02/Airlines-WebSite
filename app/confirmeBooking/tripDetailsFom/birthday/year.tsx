type Props = {
  year: string
  onSelectYear: (year: string) => void
}

export default function BirthdayYear({ year, onSelectYear }: Props) {

  const currentYear = new Date().getFullYear()-18
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <select
      value={year}
      onChange={(e) => onSelectYear(e.target.value)}
      className="w-full outline-none bg-transparent"
    >
      <option value="">Year</option>
      {years.map(y => (
        <option key={y} value={y.toString()}>
          {y}
        </option>
      ))}
    </select>
  )
}
