import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

  const role = Cookies.get("role");
  const username = Cookies.get("username") || "Admin User";

  const adminNav = [
    { name: "Dashboard", path: "/dashboard/view" },
    { name: "View", path: "/dashboard/employees" },
    { name: "Add Employee", path: "/dashboard/employees/add" },
  ];

  const userNav = [
    { name: "Dashboard", path: "/dashboard/view" },
    { name: "View", path: "/dashboard/employees" },
  ];

  const navigation = role === "admin" ? adminNav : userNav;

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("username");
    navigate("/auth/login");
  };

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-black to-blue-900">
      {({ open }) => (
        <>
          {/* FULL WIDTH BAR */}
          <div className="w-full px-6">
            <div className="flex h-16 items-center">
              {/* Spacer pushes everything to right */}
              <div className="flex-1"></div>

              {/* Desktop Nav */}
              <div className="hidden sm:flex items-center space-x-10">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-white font-semibold"
                          : "text-gray-300 hover:text-white"
                      } text-sm transition`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Profile */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex flex-col items-center text-white">
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs mt-1">{username}</span>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active && "bg-gray-100"
                            } w-full text-left px-4 py-2 text-sm`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Mobile Button */}
              <div className="sm:hidden ml-auto">
                <Disclosure.Button className="p-2 text-gray-300 hover:text-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden px-6 pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="block text-gray-300 hover:text-white"
                >
                  {item.name}
                </NavLink>
              ))}
              <button onClick={logout} className="text-red-400 mt-3">
                Sign out
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
