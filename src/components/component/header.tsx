"use client";

import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { JSX, SVGProps } from "react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { usePathname } from "next/navigation";
import { baseSepolia } from "thirdweb/chains";
import { motion } from "framer-motion";

interface HeaderProps {
  client: any; // Replace 'any' with the correct type from thirdweb
  wallets: any[]; // Replace 'any[]' with the correct type from thirdweb
}

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email", "passkey"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className="px-4 lg:px-6 h-14 flex items-center"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <motion.div variants={itemVariants}>
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
          aria-label="Home"
        >
          <CameraIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Time Scape AI</span>
        </Link>
      </motion.div>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {navItems.map(({ name, href }) => (
          <motion.div key={name} variants={itemVariants}>
            <Link
              href={href}
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname === href ? "text-primary" : ""
              }`}
              prefetch={false}
              onClick={(e) => {
                if (href.startsWith("/#") && pathname === "/") {
                  e.preventDefault();
                  const element = document.getElementById(href.substring(2));
                  element?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {name}
            </Link>
          </motion.div>
        ))}
        <motion.div variants={itemVariants}>
          <ConnectButton
            client={client}
            chain={baseSepolia}
            wallets={wallets}
            theme={"light"}
            connectButton={{
              label: "Log in",
              className: "px-8 py-3 rounded-full text-sm font-medium",
              style: {
                backgroundColor: "#fbf9d0",
                color: "black",
                borderRadius: "9999px",
              },
            }}
            connectModal={{
              size: "compact",
              title: "Sign in",
              showThirdwebBranding: false,
            }}
          />
        </motion.div>
      </nav>
    </motion.header>
  );
}

function CameraIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
