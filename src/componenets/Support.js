import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    },
    email:{
        color: 'blue'
    }
}));


export default function Privacy({ history }) {

    const classes = useStyles();

    return (
     <div className={classes.root}>
         <h4>For support send an e-mail to: <span className={classes.email}>aamnafea@hotmail.com</span></h4>
     </div>
    )
}