// import { Menu } from "@/services/auth/types";
export interface Menu {
	name: string;
	path: string;
	menu_icon: string | null;
	items: string[];
	childrens: Menu[];
}

export const configMenuUser: Menu[] = [
	{
		name: "Dashboard",
		path: "/dashboard",
		menu_icon: "dashboard-2-line",
		items: ["read_dashboard"],
		childrens: [],
	},
	{
		name: "Credit Leads",
		path: "/credit-leads",
		menu_icon: "file-list-3-line",
		items: [],
		childrens: [],
	},
];

export const configMenuAdmin: Menu[] = [
	{
		name: "Dashboard",
		path: "/dashboard",
		menu_icon: "dashboard-2-line",
		items: ["read_dashboard"],
		childrens: [],
	},
	{
		name: "Approval Credit Leads",
		path: "/approval-credit-leads",
		menu_icon: "file-list-3-line",
		items: [],
		childrens: [],
	},
];
