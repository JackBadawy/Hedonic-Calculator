import HNav from "../Nav/HNav";

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => (
  <div className="text-hpal-500 min-h-screen flex flex-col items-center bg-hpal-200">
    <HNav />
    <div className="h-max">
      <div className="bg-hpal-100 p-8 rounded-lg shadow-md w-96">
        {children}
      </div>
    </div>
  </div>
);
export default AuthContainer;
