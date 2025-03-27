'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSibarCollapsed } from '@/state';
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        } 
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? 'bg-blue-200 text-white' : ''
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } text-gray-700 font-medium`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const toggleSidebar = () => {
    dispatch(setIsSibarCollapsed(!isSidebarCollapsed));
  };
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSidebarCollapsed ? 'hidden' : 'block'
          } font-extrabold text-2xl whitespace-nowrap`}
        >
          C-Stock
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" size={24} />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          label="Dashboard"
          icon={Layout}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          label="Inventory"
          icon={Archive}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          label="Products"
          icon={Clipboard}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          label="Users"
          icon={User}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          label="Settings"
          icon={SlidersHorizontal}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          label="Expenses"
          icon={CircleDollarSign}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <footer>
        <p
          className={`text-center text-xl text-gray-500 ${
            isSidebarCollapsed ? 'hidden' : ''
          }`}
        >
          &copy; 2025 C.Stock
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
