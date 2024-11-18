interface AuthButtonProps {
  text: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text }) => (
  <button
    type="submit"
    className="w-full bg-hpal-300 text-hpal-100 rounded-md py-2 px-4 hover:bg-hpal-400 transition-colors"
  >
    {text}
  </button>
);
export default AuthButton;
