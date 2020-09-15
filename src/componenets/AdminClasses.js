import React, { useState, useEffect } from 'react'
import {
    Drawer, List, ListItem, ListItemText, TextField, TableContainer, MenuItem,
    Paper, Table, TableBody, TableCell, TableRow, TableHead, Button, Typography, Stepper, Step, StepLabel
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import { getStudents } from '../api/Firebase'


export default function Classes() {

    const theme = useTheme()

    const useStyles = makeStyles(() => ({
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }))

    const classes = useStyles()

    return (
        <div>
            <Typography variant="h6">Number of Classes per day</Typography>
        </div>
    )

}