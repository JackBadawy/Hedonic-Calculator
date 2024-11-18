import Link from "next/link";

interface AuthLinkProps {
  href: string;
  text: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ href, text }) => (
  <div className="mt-4 text-center">
    <Link href={href} className="text-hpal-300 hover:text-hpal-400">
      {text}
    </Link>
  </div>
);
export default AuthLink;
