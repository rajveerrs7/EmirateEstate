"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Search, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const isHome = pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <header className="w-full border-b bg-white py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        
        <Link href="/" className="text-2xl font-bold text-blue-700">
          EmirateEstate
        </Link>

        <div className="flex items-center gap-4">
          
          {isHome && !session && (
            <>
              <Link href="/sign-in">
                <Button variant="outline">Login</Button>
              </Link>

              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {!isHome && (
            <div className="flex items-center gap-3">
              

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                      <User className="h-5 w-5" />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/saved-agencies")}>
                      Saved Agencies
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/saved-properties")}>
                      Saved Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/sign-in">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
