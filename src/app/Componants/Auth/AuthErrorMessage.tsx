interface ErrorMessageProps {
  message?: string;
}

const AuthErrorMessage: React.FC<ErrorMessageProps> = ({ message }) =>
  message ? <p className="text-red-500 mb-4">{message}</p> : null;
export default AuthErrorMessage;
