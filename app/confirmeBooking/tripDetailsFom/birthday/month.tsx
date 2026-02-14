

type Props = {
  month: string
  onSelectMonth: (month: string) => void
}

export default function BirthdayMonth({ month, onSelectMonth }: Props) {
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  return (
    <select
      value={month}
      onChange={(e) => onSelectMonth(e.target.value)}
      className="w-full outline-none bg-transparent"
    >
      <option value="">Month</option>
      {months.map(m => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  )
}
