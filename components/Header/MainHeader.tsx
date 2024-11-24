"use client";

import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useContext, useState, useEffect } from "react";

import { CartContext } from "@/contexts/cart";

import { useTheme } from "next-themes";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MainHeader() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce(
        (acc: number, cur: { qty?: number }) => acc + (cur.qty || 0),
        0
      )
    );
  }, [cart.cartItems]);

  const { setTheme } = useTheme();
  const links = [
    {
      id: 1,
      title: "صفحه اصلی",
      route: "/",
    },
    {
      id: 2,
      title: "محصولات",
      route: "/products",
    },
    {
      id: 3,
      title: "وبلاگ",
      route: "/mag",
    },
    {
      id: 4,
      title: "درباره ما",
      route: "/about-us",
    },
    {
      id: 5,
      title: "تماس باما",
      route: "/contact-us",
    },
  ];

  return (
    <>
      <header className="w-full bg-white shadow-md dark:bg-zinc-800 sticky top-0 px-4 md:px-10 py-4 z-40 text-sm font-[fontd1]">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center md:hidden gap-x-4">
              <Sheet>
                <SheetTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.6em"
                    height="1.6em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="48"
                      d="M88 152h336M88 256h336M88 360h336"
                    />
                  </svg>
                </SheetTrigger>
                <SheetContent>
                  <div className="mr-2 -mt-3.5 w-full bg-red300 flex items-center justify-between font-[fontd1]">
                    <div className="flex items-center justify-center gap-x-3 mr-5">
                      <Image
                        src="/logo.svg"
                        alt="logo"
                        width={30}
                        height={30}
                      />
                      <span className="text-orange-300 text-sm font-[fontm1]">
                        اسم سایت
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-x-4">
                      <button
                        onClick={() => setTheme("dark")}
                        className="dark:hidden"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setTheme("light")}
                        className="hidden dark:block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"
                          />
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-10 font-[fontd1]">
                    <ul className="flex flex-col gap-y-4">
                      {links.map((item, index) => (
                        <li
                          key={index}
                          className={
                            pathname === item.route
                              ? "border-x px-2 text-orange-300 border-orange-300"
                              : "border-x px-2"
                          }
                        >
                          <SheetClose asChild>
                            <Link href={item.route}>{item.title}</Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Link
              href="/"
              className="flex items-center gap-x-3 md:gap-x-5 mr-4 md:mr-0"
            >
              <Image src="/logo.svg" alt="logo" width={35} height={35} />
              <span className="text-orange-300 md:ml-5 font-[fontm1]">
                اسم سایت
              </span>
            </Link>
            <ul className="hidden md:flex items-center justify-center gap-x-4">
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.route}
                    className={pathname === item.route ? "text-orange-300" : ""}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-6">
            <div className="hidden md:flex items-center">
              <button onClick={() => setTheme("dark")} className="dark:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 512 512"
                  className="mb-0.5"
                >
                  <path
                    fill="currentColor"
                    d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480"
                  />
                </svg>
              </button>
              <button
                onClick={() => setTheme("light")}
                className="hidden dark:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"
                  />
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <Link
              href={session?.user ? "/dashbord" : "/auth/sign-in"}
              className={
                session?.user && pathname === "/dashbord"
                  ? "flex items-center justify-center gap-x-1 md:gap-x-2 text-orange-300"
                  : pathname === "/auth/sign-in" || pathname === "/auth/sign-up"
                  ? "flex items-center justify-center gap-x-1 md:gap-x-2 text-orange-300"
                  : "flex items-center justify-center gap-x-1 md:gap-x-2"
              }
            >
              {session?.user ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="6" r="4" fill="currentColor" />
                  <path
                    fill="currentColor"
                    d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linejoin="round"
                      d="M2.001 11.999h14m0 0l-3.5-3m3.5 3l-3.5 3"
                    />
                    <path d="M9.002 7c.012-2.175.109-3.353.877-4.121C10.758 2 12.172 2 15 2h1c2.829 0 4.243 0 5.122.879C22 3.757 22 5.172 22 8v8c0 2.828 0 4.243-.878 5.121C20.242 22 18.829 22 16 22h-1c-2.828 0-4.242 0-5.121-.879c-.768-.768-.865-1.946-.877-4.121" />
                  </g>
                </svg>
              )}
              {session?.user ? (
                <>
                  <span className="hidden lg:block">
                    {session?.user.username}
                  </span>
                  <span className="block lg:hidden">پروفایل</span>
                </>
              ) : (
                <span className="hidden lg:block">ورود | ثبت نام</span>
              )}
            </Link>
            <Link
              href="/cart"
              className={
                pathname === "/cart"
                  ? "flex items-center justify-center gap-x-2 text-orange-300"
                  : "flex items-center justify-center gap-x-2"
              }
            >
              {cart.cartItems.length > 0 && (
                <span className="bg-orange-400 rounded-full text-[12px] size-4 text-center block -ml-4 -mt-4 z-20 text-white">
                  {cartItemsCount}
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="m239.71 74.14l-25.64 92.28A24.06 24.06 0 0 1 191 184H92.16A24.06 24.06 0 0 1 69 166.42L33.92 40H16a8 8 0 0 1 0-16h24a8 8 0 0 1 7.71 5.86L57.19 64H232a8 8 0 0 1 7.71 10.14M88 200a16 16 0 1 0 16 16a16 16 0 0 0-16-16m104 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"
                />
              </svg>
              <span className="hidden md:block">سبد خرید</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
