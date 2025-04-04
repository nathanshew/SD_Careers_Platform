"use client";

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const pathName = usePathname();
    const navigation = [
        { name: "Home", href: "/home", current: pathName.endsWith("home") },
        { name: "Search", href: "/search", current: pathName.endsWith("search") },
        { name: "Roles", href: "/roles", current: pathName.endsWith("roles") },
        { name: "Apply", href: "/apply", current: pathName.endsWith("apply") },
        { name: "About Us", href: "/about-us", current: pathName.endsWith("about-us") },
    ];

    return (
        <Disclosure as="nav" className="bg-blue-950 font-body relative z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            {/* Logo always on the left */}
                            <div className="flex items-center">
                                <img
                                    alt="NUS Fintech Society Logo"
                                    src="https://fintechsociety.comp.nus.edu.sg/_next/image?url=%2Fimages%2Ffintechsoc-logo.png&w=1920&q=100"
                                    className="h-10 w-auto"
                                />
                            </div>

                            {/* Desktop nav + profile */}
                            <div className="hidden sm:flex items-center space-x-6 ml-auto">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? "page" : undefined}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-200 hover:bg-gray-700 hover:text-white",
                                                "rounded-md px-3 py-2 text-lg font-bold"
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>


                                {/* Profile */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <img
                                            alt="User"
                                            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? "bg-gray-100" : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    Profile
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? "bg-gray-100" : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? "bg-gray-100" : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>

  return (
    <Disclosure as="nav" className="bg-blue-950 font-body">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                alt="NUS Fintech Society Logo"
                src="/fintechsoc-logo.png"
                width={192}
                height={64}
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-200 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-lg font-bold"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    alt="User Profile Picture"
                    src="/Portrait_Placeholder.png"
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {isAuthenticated ? (
                  <>
                    <MenuItem>
                      <a
                        href="/applicant"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <a
                        href="/signin"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sign in
                      </a>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center sm:hidden">
                                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    {/* Mobile sidebar drawer */}
                    <DisclosurePanel className="sm:hidden">
                        <div className="fixed top-0 right-0 h-full w-3/4 bg-white z-50 p-6 shadow-lg flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <img
                                    alt="NUS Fintech Society Logo"
                                    src="https://fintechsociety.comp.nus.edu.sg/_next/image?url=%2Fimages%2Ffintechsoc-logo.png&w=1920&q=100"
                                    className="h-10 w-auto"
                                />
                                <DisclosureButton className="text-black">
                                    <XMarkIcon className="h-6 w-6" />
                                </DisclosureButton>
                            </div>

                            <div className="flex flex-col space-y-6">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            "uppercase text-sm font-bold text-blue-950 pb-1 border-b border-orange-400 hover:text-blue-700"
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
