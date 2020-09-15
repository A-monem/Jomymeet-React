import React, { useContext, useState } from 'react'
import {  AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { UserContext } from '../context/UserContext'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { auth } from '../api/Firebase'

export default function Appbar({ history, setDrawerState}) {
    const theme = useTheme()
    const { user, addUser, addTimetable, timetable } = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        auth.signOut().then(() => {
            addUser(null)
            addTimetable(null)
        }).catch(function(error) {
            console.log(error)
        });
    }
    const useStyles = makeStyles(() => ({
        appBar: {
            color: theme.palette.primary.main,
            background: 'transparent'
        },
        logo: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
        title: {
            flexGrow: 1,
        },
    }))
    const classes = useStyles()

    return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerState(true)}>
                        <img src={`./logo-no-text.png`} alt={'logo'} className={classes.logo} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Jomy
                    </Typography>
                    <Typography >{user.firstName} {user.lastName}</Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={isMenuOpen}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
    )

}