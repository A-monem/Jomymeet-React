import React, { useContext, useState } from 'react'
import { Button, TextField, FormControlLabel, Checkbox,
  Link, Paper, Box, Grid, Typography, Switch} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ThemeContext } from '../context/ThemeContext'
import { UserContext } from '../context/UserContext'
import { auth , firestore } from '../api/Firebase'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        www.jomymeet.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}


export default function Login({ history }) {

  const [email, setEmail] = useState('admin@jomymeet.com')
  const [password, setPassword] = useState('admin123')
  
  const { toggleTheme } = useContext(ThemeContext)
  const { addUser, addTimetable } = useContext(UserContext)
  const theme = useTheme()
  const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      margin: 0, 
      padding: 0
    },
    image: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/school.jpg)`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(6, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    label: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      alignItems: 'center'
    }
  }))
  const classes = useStyles()

  async function login() {
		try {
      await auth.signInWithEmailAndPassword(email, password)
      const usersSnapshot = await firestore.collection("users").doc(auth.currentUser.uid).get()
      
      if (usersSnapshot.data().type === 'student'){
        const grade = usersSnapshot.data().grade.toString()
        const classroom = usersSnapshot.data().classroom.toString()
        const timetableSnapshot = await firestore.collection("timetable").doc(grade).get()
        timetableSnapshot.data() && timetableSnapshot.data()[classroom] ? addTimetable(timetableSnapshot.data()[classroom]) : addTimetable(null)
      }
      
      addUser(usersSnapshot.data())
      
      history.push('/dashboard')
      
		} catch(error) {
			alert(error.message)
    }
	}

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <img src={`./logo.png`} alt={'logo'} className={classes.logo}/>
          <Typography variant="h6" className={classes.label}>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => login()}
            >
              Sign In
            </Button>
            <Grid container className={classes.link}>
              <Grid item xs>
                <Link href="#" variant="body2" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <FormControlLabel
                control={<Switch onChange={toggleTheme} />}
                label="Dark mode"
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}