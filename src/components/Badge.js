function Badge({ text, color, className }) {
  return (
    <div
      className={`bg-${color} px-2 py-2 ${className} text-sm leading-3 rounded-full`}
    >
      {text}
    </div>
  )
}

export default Badge
