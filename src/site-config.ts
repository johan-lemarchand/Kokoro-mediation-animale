export const SiteConfig = {
  title: "Kokoro",
  description:
    "Découvrez Kokoro Médiation Animale, spécialiste en médiation animale dans le Bas-Rhin. Nous offrons des services de bien-être, de développement personnel et de renforcement de la confiance en soi grâce à des interactions enrichissantes avec les animaux. Basés en Alsace dans le Bas-Rhin, nous sensibilisons au respect des animaux et développons des apprentissages pour tous, adaptés à votre environnement local.",
  prodUrl: "https://kokoro-mediation-animale.fr/",
  domain: "kokoro-mediation-animale.fr",
  appIcon: "/favicon.ico",
  company: {
    name: "Kokoro Médiation Animale",
    address: "26 E rue de Kaltenhouse, 67240 OBERHOFFEN-SUR-MODER",
  },
  brand: {
    primary: "#007291",
  },
  email: {
    /**
     * Replace this with your domaine email.
     * If you don't have one, you can use `test@resend.com`
     * If you use Resend domain, you can ONLY send email to your account email.
     */
    from: "Kokoro médiation animale <delivered@resend.dev>",
    contact: "kokoro.mediation.animale@gmail.com",
  },
  maker: {
    image: "https://melvynx.com/images/me/twitter-en.jpg",
    website: "https://melvynx.com",
    twitter: "https://twitter.com/melvyn_me",
    name: "Louise Burg",
  },
  features: {
    /**
     * If enable, you need to specify the logic of upload here : src/features/images/uploadImageAction.tsx
     * You can use Vercel Blob Storage : https://vercel.com/docs/storage/vercel-blob
     * Or you can use Cloudflare R2 : https://mlv.sh/cloudflare-r2-tutorial
     * Or you can use AWS S3 : https://mlv.sh/aws-s3-tutorial
     */
    enableImageUpload: false as boolean,
    /**
     * If enable, you need to go to src/lib/auth/auth.ts and uncomment the line with the emoji 🔑
     * This feature will authorize users to login with a password.
     * Customize the signup form here : app/auth/signup/page.tsx
     */
    enablePasswordAuth: false as boolean,
    /**
     * If enable, the user will be redirected to `/org` when he visits the landing page at `/`
     * The logic is located in middleware.ts
     */
    enableLandingRedirection: false as boolean,
    /**
     * If enable, the user will be able to create only ONE organization and all his settings will be synced with it.
     * It's disable the `/settings` page from the organization and the `/org/new` page.
     */
    enableSingleMemberOrg: false as boolean,
  },
};
