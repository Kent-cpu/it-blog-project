import {ALL, LOGIN, REGISTRATION, SEARCH, SETTING} from "./utils/constants";
import {Authorization} from "./pages/Authorization";
import {Registration} from "./pages/Registration";
import {Search} from "./pages/Search";
import {Header} from "./components/Header";
import {ProfileSetting, Setting} from "./pages/Setting";

export const publicRouters = [

    {
        path: ALL,
        Component: Header,
    },

    {
        path: LOGIN,
        Component: Authorization,
    },

    {
        path: REGISTRATION,
        Component: Registration,
    },

    {
        path: SEARCH,
        Component: Search,
    },

]

export const privateRouters = [
    {
        path: SEARCH,
        Component: Search,
    },

    {
        path: ALL,
        Component: Header,
    },

    {
        path: SETTING,
        Component: Setting,
    }
]