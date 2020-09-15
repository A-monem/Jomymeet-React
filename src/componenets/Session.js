import React, { useEffect } from 'react';
import {  CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default function Session( {match, history} ){

    const useStyles = makeStyles(() => ({
        root: {
            height: '100vh',
            width: '100vw'
        }
    }))

    const classes = useStyles()

    const startConference = () => {
        const roomName = match.params.id;
            //const domain = 'jitsi.jomymeet.com'
            const domain = 'meet.jit.si'
            const options = {
                roomName: roomName,
                width: '100%',
                height: '100%',
                parentNode: document.querySelector('#jitsiContainer')
            };
    
            const apiObj = new window.JitsiMeetExternalAPI(domain, options);
            
            apiObj.addEventListeners({
                readyToClose: function () {
                    history.push('/dashboard')
                }
            })
    }

    useEffect(() => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        if (window.JitsiMeetExternalAPI) startConference();
        else alert('Jitsi Meet API script not loaded');
       }, []);

    return (
        <>
        <CssBaseline />
        <div className={classes.root} id="jitsiContainer"></div>
        </>
        
    );
}