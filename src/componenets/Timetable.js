import React, { useContext, useState } from 'react'
import { Button, Paper, Grid, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, AppBar, Toolbar, IconButton, Menu, MenuItem} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { UserContext } from '../context/UserContext'
import { auth, firestore } from '../api/Firebase'

export default function Timetable({ history }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme()
    const { user, addUser, addTimetable, timetable } = useContext(UserContext)
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
    const addTimetableTemp = () => {

    }

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    const useStyles = makeStyles(() => ({
        root: {
            height: '100vh',
            display: 'flex', 
            flexDirection: 'column'
        },
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
        table: {
            minWidth: 650,
            margin: 'auto',
            background: theme.palette.secondary.light
        },
        dayOfTheWeek: {
            fontWeight: 500,
        },
        grid: {
            marginTop: theme.spacing(10)
        }, 
        message: {
            display: 'flex',
            flexGrow :1,
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }
    }))

    const classes = useStyles()
    const d = new Date()
    const dayRef = d.getDay() - 1
    
    const timeHourRef = d.getHours()
    const timeMinuetsRef = d.getMinutes()
    const classesTime = [{start: {hour: 8, minute: 30}, finish: {hour: 9, minute: 15}},
                        {start: {hour: 9, minute: 30}, finish: {hour: 10, minute: 15}}, 
                        {start: {hour: 10, minute: 30}, finish: {hour: 11, minute: 15}}, 
                        {start: {hour: 11, minute: 30}, finish: {hour: 12, minute: 15}}, 
                        {start: {hour: 12, minute: 30}, finish: {hour: 13, minute: 15}}]

    console.log(timeHourRef)
    console.log(timeMinuetsRef)
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
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
                        <MenuItem onClick={addTimetableTemp}>Profile</MenuItem>
                        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            {timetable 
                ?(<Grid container className={classes.grid}>
                    <Grid item xs={false} md={1}/>
                    <Grid item xs={12} md={10} component={Paper}>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Day/Time</TableCell>
                                        {classesTime.map((classTime, i) => (
                                            <TableCell key={i} align="center">
                                                {classTime.start.hour}:{classTime.start.minute} - {classTime.finish.hour}:{classTime.finish.minute}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {weekDays.map((day, i) => (
                                    <TableRow key={day}>
                                        <TableCell component="th" scope="row" className={classes.dayOfTheWeek}>
                                            {day}
                                        </TableCell>
                                        {timetable[day].map((subject, j) => (
                                            <TableCell key={j} align="center" className={classes.subjectTableCell}>
                                                <Button size={'small'}
                                                onClick={() => {history.push(`/session/${subject}${user.grade}${day[0]}Jomymeet`)}}
                                                disabled={i < dayRef ? true
                                                    : ((i === dayRef) && (timeHourRef > classesTime[j].finish.hour) ||
                                                        (i === dayRef) && (timeHourRef === classesTime[j].finish.hour) 
                                                        && (timeMinuetsRef > classesTime[j].finish.minute)) ? true 
                                                    : false}>
                                                    {subject}
                                                </Button>
                                            </TableCell>
                                        ))}
                                        </TableRow> 
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={false} md={1}/>
                    </Grid>)
                : (<div className={classes.message}>
                    <Typography variant={'h4'}>Table hasn't been added yet. Please contant your administrator</Typography>
                </div>)
            }
        </div>
    )

}