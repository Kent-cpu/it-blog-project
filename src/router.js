import {
    ADMINISTRATION_POSTS,
    CHANGE_DATA,
    CREATE_ARTICLE,
    DESIGN_POSTS,
    DEVELOPMENT_POSTS,
    LOGIN,
    MANAGEMENT_POSTS,
    POPSCI_POSTS,
    POST,
    REGISTRATION,
    REMINDER_PASSWORD,
    SEARCH,
    SETTING, USER_PROFILE, USER_PROFILE_POSTS
} from "./utils/constants";
import {Setting} from "./pages/Setting";
import {Posts} from "./pages/Posts";
import {Post} from "./pages/Post";
import {UserProfile} from "./pages/UsersProfile";
import React from "react";

const Authorization = React.lazy(() => import("./pages/Authorization"));
const Registration = React.lazy(() => import("./pages/Registration"));
const ReminderPassword = React.lazy(() => import("./pages/ReminderPassword"));
const CreateArticle = React.lazy(() => import("./pages/CreateArticle"));
const Search = React.lazy(() => import("./pages/Search"));
const ChangeData = React.lazy(() => import("./pages/ChangeData"));

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
        path: REMINDER_PASSWORD,
        Component: ReminderPassword,
    },

    {
        path: CHANGE_DATA,
        Component: ChangeData,
    },

    {
        path: DEVELOPMENT_POSTS,
        Component: Posts,
    },

    {
        path: MANAGEMENT_POSTS,
        Component: Posts,
    },

    {
        path: ADMINISTRATION_POSTS,
        Component: Posts,
    },

    {
        path: DESIGN_POSTS,
        Component: Posts,
    },

    {
        path: POPSCI_POSTS,
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
        path: CREATE_ARTICLE,
        Component: CreateArticle,
    },

    {
        path: CHANGE_DATA,
        Component: ChangeData,
    },

    {
        path: DEVELOPMENT_POSTS,
        Component: Posts,
    },

    {
        path: MANAGEMENT_POSTS,
        Component: Posts,
    },

    {
        path: ADMINISTRATION_POSTS,
        Component: Posts,
    },

    {
        path: DESIGN_POSTS,
        Component: Posts,
    },

    {
        path: POPSCI_POSTS,
        Component: Posts,
    },

    {
        path: POST,
        Component: Post,
    },

    {
        path: USER_PROFILE,
        Component: UserProfile,
    },

    {
        path: USER_PROFILE_POSTS,
        Component: UserProfile,
    }
];