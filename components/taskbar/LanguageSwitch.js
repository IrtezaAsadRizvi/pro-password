"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import Dropdown from "../common/Dropdown";
import { Languages } from "lucide-react";

export default function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (newLocale) => {
    if (!newLocale || newLocale === locale) return;
    // Same behavior as your working LocaleSwitcher:
    // switch only the locale, keep the current path
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Dropdown
      title={() => <Languages />}
      items={[
        {text: 'English', value: 'en'},
        {text: 'French', value: 'fr'},
      ]}
      initialValue={locale}
      onSelect={handleSelect}
    />
  );
}