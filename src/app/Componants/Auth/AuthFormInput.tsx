interface AuthFormInputProps {
  id: string;
  label: string;
  type: "text" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const AuthFormInput: React.FC<AuthFormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="text-sm font-semibold p-0.5 px-1 bg-hpal-200 outline-none mt-1 block w-full rounded-md shadow-sm"
      autoComplete="off"
      required={required}
    />
  </div>
);
export default AuthFormInput;
