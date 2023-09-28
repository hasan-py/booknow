export default function CustomInputLabel({
  name,
  label,
  color,
}: {
  name: string;
  label: string;
  color?: string;
}) {
  return (
    <label
      htmlFor={name}
      className={`block text-sm font-medium ${color || "text-gray-700"} mb-1`}
    >
      {label}
    </label>
  );
}
