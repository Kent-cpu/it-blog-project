import {
    ADMINISTATIONPOSTS,
    CHANGEDATA,
    CREATEARTICLE,
    DESIGNPOSTS,
    DEVELOPMENTPOSTS,
    LOGIN,
    MANAGEMENTPOSTS,
    POPSCIPOSTS,
    POST,
    REGISTRATION,
    REMINDERPASSWORD,
    SEARCH,
    SETTING
} from "./utils/constants";
import {Authorization} from "./pages/Authorization";
import {Registration} from "./pages/Registration";
import {Search} from "./pages/Search";
import {ProfileSetting, Setting} from "./pages/Setting";
import {CreateArticle} from "./pages/CreateArticle";
import {ReminderPassword} from "./pages/ReminderPassword";
import {ChangeData} from "./pages/ChangeData";
import {Posts} from "./pages/Posts";
import {Post} from "./pages/Post";

export const publicRouters = [

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

    {
        path: REMINDERPASSWORD,
        Component: ReminderPassword,
    },

    {
        path: CHANGEDATA,
        Component: ChangeData,
    },

    {
        path: DEVELOPMENTPOSTS,
        Component: Posts,
    },

    {
        path: MANAGEMENTPOSTS,
        Component: Posts,
    },

    {
        path: ADMINISTATIONPOSTS,
        Component: Posts,
    },

    {
        path: DESIGNPOSTS,
        Component: Posts,
    },

    {
        path: POPSCIPOSTS,
        Component: Posts,
    },

    {
        path: POST,
        Component: Post,
    }

];

export const privateRouters = [
    {
        path: SEARCH,
        Component: Search,
    },


    {
        path: SETTING,
        Component: Setting,
    },

    {
        path: CREATEARTICLE,
        Component: CreateArticle,
    },

    {
        path: CHANGEDATA,
        Component: ChangeData,
    },

    {
        path: DEVELOPMENTPOSTS,
        Component: Posts,
    },

    {
        path: MANAGEMENTPOSTS,
        Component: Posts,
    },

    {
        path: ADMINISTATIONPOSTS,
        Component: Posts,
    },

    {
        path: DESIGNPOSTS,
        Component: Posts,
    },

    {
        path: POPSCIPOSTS,
        Component: Posts,
    },

    {
        path: POST,
        Component: Post,
    }
];