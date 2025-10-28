"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { Languages } from "lucide-react";
import Dropdown from "../common/Dropdown";

type LocaleCode = "en" | "fr";
type DropdownItem = { text: string; value: LocaleCode };
type DropdownOnSelectArg = string | DropdownItem;

function stripLocalePrefix(path: string) {
  // remove leading /en or /fr
  return path.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
}

export default function LanguageSwitch(): React.JSX.Element {
  const t = useTranslations("Header");
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();

  const items: DropdownItem[] = [
    { text: "English", value: "en" },
    { text: "French", value: "fr" },
  ];

  const handleSelect = (next: DropdownOnSelectArg) => {
    const newLocale = typeof next === "string" ? (next as LocaleCode) : next?.value;
    // if (!newLocale || newLocale === locale) return;
    console.log('newLocale', newLocale)
    const basePath = stripLocalePrefix(pathname);
    router.replace(basePath, { locale: newLocale }); // ✅ next-intl v2 client router
  };

  return (
    <Dropdown
      title={() => <Languages />}
      tooltip={t("select_language")}
      items={items}
      initialValue={locale}
      onSelect={handleSelect}
    />
  );
}
