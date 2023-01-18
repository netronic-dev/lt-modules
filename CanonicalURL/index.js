import { useRouter } from 'next/router';

export function CanonicalURL() {
  const siteUrl = 'https://lasertag.net';
  const router = useRouter();
  const cleanPath = router.asPath.split('#')[0].split('?')[0];
  const canonicalUrl = `${siteUrl}` + (router.asPath === '/' ? '' : cleanPath);
  return (
    <link rel="canonical" href={canonicalUrl} />
  );
};