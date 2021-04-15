import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import CategoryIcon from '@material-ui/icons/Category';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';

export const sideMenuData =[
    {
        title: "НҮҮР",
        icon: <HomeIcon />,
        path: "/home"
    },
    {
        title: "DASHBOARD",
        icon: <DashboardIcon />,
        path: "/dashboard"
    },
    {
        title: "МЭНЮ",
        icon: <MenuIcon />,
        path: "/menu"
    },
    {
        title: "АНГИЛАЛ",
        icon: <CategoryIcon />,
        path: "/categories"
    },
    {
        title: "БҮТЭЭГДЭХҮҮН",
        icon: <FileCopyIcon />,
        path: "/products"
    },
    {
        title: "АЖИЛТАН",
        icon: <FileCopyIcon />,
        path: "/employee"
    },
    {
        title: "ТОХИРГОО",
        icon: <SettingsIcon />,
        path: "/settings",
        subNav: [
            {
                title: "HEADER", 
                icon: <PhotoSizeSelectActualIcon />,
                path: "/header"
            },
            {
                title: "FOOTER",
                icon: <PhotoSizeSelectActualIcon />,
                path: "/footer"
            }
        ]
    }
    
];
