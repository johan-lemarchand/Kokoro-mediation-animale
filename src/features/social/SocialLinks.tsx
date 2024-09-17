// ========================================================
import { Facebook, Instagram, Linkedin } from 'lucide-react';

type SocialLinksProps = { className?: string };
// ========================================================
const links = [
  {
    id: 1,
    Icon: Facebook,
    url: 'https://www.linkedin.com/in/louise-burg-b873131a3/',
  },
  {
    id: 2,
    Icon: Linkedin,
    url: 'https://www.facebook.com/profile.php?id=61561615330001',
  },
  {
    id: 3,
    Icon: Instagram,
    url: 'https://www.instagram.com/kokoro.mediation.animale?igsh=MW95cjd4eHRhNzR2Ng==',
  },
];

export default function SocialLinks({
  className = 'nav social social-white mt-4',
}: SocialLinksProps) {
  return (
    <nav className={`${className} flex gap-2`}>
      {links.map(({ id, Icon, url }) => (
        <a 
          href={url} 
          key={id} 
          target="_blank" 
          rel="noreferrer"
          className="p-2 rounded-full transition-all duration-200 hover:bg-primary hover:text-white"
        >
          <Icon size={24} />
        </a>
      ))}
    </nav>
  );
}
