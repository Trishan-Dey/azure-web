import Image from "next/image";

import logo from "../../public/images/logo.png";

type LogoProps = {
  className?: string;
  alt?: string;
};

export default function Logo({
  className = "h-9 w-auto",
  alt = "Azure Systems",
}: LogoProps) {
  return (
    <Image
      src={logo}
      alt={alt}
      className={className}
      width={549}
      height={439}
      sizes="200px"
      priority
    />
  );
}