"use client";
/** Adapted from Kokonut UI Slide Text Button (MIT), © kokonut-labs.
 * https://kokonutui.com/r/slide-text-button.json
 * Removed entrance animation; added reduced-motion and accessible duplicate text. */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  text: string;
  variant?: "primary" | "outline" | "light";
};
export default function SlideTextButton({
  href,
  text,
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={`slide-button ${variant} ${className}`}
      {...props}
    >
      <span className="button-text-window">
        <span className="button-text-track">
          <span>{text}</span>
          <span aria-hidden="true" className="button-text-copy">
            {text}
          </span>
        </span>
      </span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
