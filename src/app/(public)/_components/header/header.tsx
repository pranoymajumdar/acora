import React from "react";
import UtilityBar from "./utility-bar";
import DesktopNavigation from "./desktop-navigation";
import UserDropdown from "./user-dropdown";
import Search from "./search";
import MobileSheet from "./mobile-sheet";
import Cart from "./cart";
import Wishlist from "./wish-list";

const Header = () => {
  return (
    <div className="flex flex-col w-full">
      <UtilityBar />
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button: TODO */}
            <MobileSheet />
            {/* LOGO */}
            <div className="text-3xl">ACORA</div>

            {/* Desktop Navigation */}
            <DesktopNavigation />

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Search />
              {/* Wishlist Button */}
              {/* <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative"
              >
                <LucideHeart className="h-5 w-5" />
                {2 > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {2}
                  </Badge>
                )}
              </Button> */}
              <Wishlist />

              {/* User Dropdown Or Login */}

              <UserDropdown />
              {/* Cart */}
              <Cart />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
