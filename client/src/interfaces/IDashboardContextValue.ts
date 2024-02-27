import { IUser } from "./IUser";

export interface IDashboardContextValue {
    user: IUser;
    showSidebar: boolean;
    isDarkTheme: boolean;
    toggleDarkTheme: () => void;
    toggleSidebar: () => void;
    logoutUser: () => void;
}
