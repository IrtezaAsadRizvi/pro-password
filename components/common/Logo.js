import Link from "next/link";
import Image from "next/image";
import logo from "@/public/propassword_logo_192x192.png"; // static import

export default function Logo() {
  return (
    <h1 className="flex items-center gap-2">
      <Image
        src={logo}
        alt="ProPasword"
        priority
        className="w-8 h-8 object-contain" // control the rendered size
      />
      <span className="font-semibold text-xl">PRO PASSWORD</span>
    </h1>
  );
}
