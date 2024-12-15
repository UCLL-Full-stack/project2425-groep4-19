import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <select value={locale} onChange={changeLanguage}>
      <option value="en">English</option>
      <option value="nl">Dutch</option>
    </select>
  );
};

export default LanguageSwitcher;