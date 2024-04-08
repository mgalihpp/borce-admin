"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import useCart from "@/store/use-cart";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { cartItems } = useCart();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") {
        if (searchQuery === "") return;

        router.push(`/search/${searchQuery}`);
      }
    },
    inputRef,
  );

  return (
    <div className="navbar">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-10 py-2.5 max-sm:px-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={130} height={100} />
        </Link>

        <div className="flex gap-6 text-base-bold max-lg:hidden">
          <Link
            href="/"
            className={`hover:text-blue-1 ${pathname === "/" && "text-blue-1"}`}
          >
            Home
          </Link>
          <Link
            href={user ? "/wishlist" : "/sign-in"}
            className={`hover:text-blue-1 ${
              pathname === "/wishlist" && "text-blue-1"
            }`}
          >
            Wishlist
          </Link>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className={`hover:text-blue-1 ${
              pathname === "/orders" && "text-blue-1"
            }`}
          >
            Orders
          </Link>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-grey-2 px-3 py-2">
          <input
            ref={inputRef}
            className="outline-none max-sm:max-w-[100px]"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            disabled={searchQuery === ""}
            onClick={() => router.push(`/search/${searchQuery}`)}
          >
            <Search className="size-4 cursor-pointer items-center hover:text-blue-1" />
          </button>
        </div>

        <div className="relative flex items-center gap-3">
          <Link
            href="/cart"
            className="flex items-center justify-center gap-3 rounded-full px-2 py-1 max-md:hidden"
          >
            <div className="relative py-2">
              <div className="absolute left-4 top-1">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-blue-1 p-2 text-xs text-white">
                  {cartItems.length}
                </p>
              </div>
              <ShoppingCart />
            </div>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer lg:hidden" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-y-6">
                <Link
                  href="/"
                  className="text-heading4-medium hover:text-blue-1"
                >
                  Home
                </Link>
                <Link
                  href={user ? "/wishlist" : "/sign-in"}
                  className="text-heading4-medium hover:text-blue-1"
                >
                  Wishlist
                </Link>
                <Link
                  href={user ? "/orders" : "/sign-in"}
                  className="text-heading4-medium hover:text-blue-1"
                >
                  Orders
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-start gap-3 rounded-full px-2 py-1"
                >
                  <div className="relative py-2">
                    <div className="absolute left-4 top-1">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                        {cartItems.length}
                      </p>
                    </div>
                    <ShoppingCart />
                  </div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {user ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Link href="/sign-in">
              <CircleUserRound />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
