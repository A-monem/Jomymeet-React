import React, { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemText, TextField, TableContainer, MenuItem,
    Paper, Table, TableBody, TableCell, TableRow, TableHead, Button, Typography, Stepper, Step, StepLabel} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table';
import { getStudents, addStudent, updateStudent, deleteStudent, getTimetable, addTimetable, getAllTimetables } from '../api/Firebase'
import Appbar from './Appbar'

export default function Admin() {
    const [drawerState, setDrawerState] = useState(false)
    const [studentsUI, setStudentsUI] = useState(true)
    const [timetableUI, setTimetableUI] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [students, setStudents] = useState([])
    const [timetables, setTimetables] = useState('')
    const [timetable, setTimetable] = useState('')
    const [grade, setGrade] = useState('')
    const [classroom, setClassroom] = useState('')
    const [existingGradesClassrooms, setExistingGradesClassrooms] = useState({})
    const [activeStep, setActiveStep] = useState(0);
    const allGrades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    const allClassrooms = ['1', '2', '3', '4']
    const columns = [
        { title: 'First Name', field: 'firstName', align: 'center' },
        { title: 'Surname', field: 'lastName', align: 'center' },
        { title: 'Grade', field: 'grade', type: 'numeric', align: 'center' },
        { title: 'classroom', field: 'classroom', type: 'numeric', align: 'center' },
        { title: 'E-mail Address', field: 'email', align: 'center' }
    ]
    const classesTime = [{ start: '08:30', finish: '09:15' }, { start: '09:30', finish: '10:15' }, { start: '10:30', finish: '11:15' },
    { start: '11:30', finish: '12:15' }, { start: '12:30', finish: '13:15' }]
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    
    const resetTimetable = () => {
        const y = weekDays.reduce((obj, weekday) => {
            obj[weekday] = Array(classesTime.length)
            return obj
        }, {})
        setTimetable(y)
    }

    useEffect(() => {
        getStudents().then(studentsDoc => {
            setStudents(studentsDoc)
            getAllTimetables().then((timetablesDoc) => {
                setTimetables(timetablesDoc)
                const x = Object.keys(timetables).reduce((obj, grade) => {
                    obj[grade] = Object.keys(timetables[grade])
                    return obj
                }, {})
                console.log(x)
                setExistingGradesClassrooms(x)
            }).then(() => {
                console.log(timetables)
                setIsLoaded(true)
            })
        })
    }, [isLoaded])

    const handleGradeChange = (e) => {
        setGrade(e.target.value)
        if (existingGradesClassrooms[e.target.value] && existingGradesClassrooms[e.target.value].includes(classroom)){
            console.log(timetables[e.target.value][classroom])
            setTimetable(timetables[e.target.value][classroom])
        } else {
            resetTimetable()
        }
        setIsLoaded(false)
    }

    const handleClassroomChange = (e) => {
        setClassroom(e.target.value)
        if (existingGradesClassrooms[grade] && existingGradesClassrooms[grade].includes(e.target.value)){
            console.log(timetables[grade][e.target.value])
            setTimetable(timetables[grade][e.target.value])
        } else {
            resetTimetable()
        }
        setIsLoaded(false)
    }

    const handleAddSubject = (day, j, newSubject) => {
        let tmpTimetable = timetable
        tmpTimetable[day].splice(j, 1, newSubject)
        console.log('timetable handle', tmpTimetable[day])
        setTimetable(tmpTimetable)
    }

    function getSteps() {
        return ['Enter number of classes per day', 'Enter Class Times', 'Select week days'];
      }
      
      function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return <TextField id="outlined-basic" label="Number of Classes per day" variant="outlined" />;
          case 1:
            return <TextField id="outlined-basic" label="Number of Classes per day" variant="outlined" />;
          case 2:
            return <TextField id="outlined-basic" label="Number of Classes per day" variant="outlined" />;
          default:
            return 'Unknown stepIndex';
        }
      }
      const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

    const theme = useTheme()

    const useStyles = makeStyles(() => ({
        root: {
            height: '100vh',
            display: "flex",
            flexDirection: "column",
        },
        body: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
        },
        list: {
            width: theme.spacing(25),
        },
        studentsContainer: {
            width: "100%",
            height: "100%"
        },
        select: {
            width: '100%',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: 'center',
            marginTop: theme.spacing(3),
        },
        timetableContainer: {
            width: '100%',
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }, 
        main: {
            display: 'flex',
            flexGrow :1,
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' 
        },
        classesContainer: {
            width: '100%',
            flexGrow:1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: 'center',
        },
        form: {
            marginTop: theme.spacing(1)
        },
        classesBody:{
            height:'100%',
            flexGrow:1,
        },
        backButton: {
            marginRight: theme.spacing(1),
          },
        instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        },
    }))

    const classes = useStyles()

    const UI = () => (
        studentsUI
            ? (
                <div className={classes.studentsContainer}>
                    <MaterialTable
                        options={{ paging: false, headerStyle: { background: theme.palette.secondary.light } }}
                        style={{ height: '100%', }}
                        title="Students"
                        columns={columns}
                        data={students}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        addStudent(newData)
                                            .then(() => {
                                                setIsLoaded(false)
                                                resolve()
                                            })
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        updateStudent(newData)
                                            .then(() => {
                                                setIsLoaded(false)
                                                resolve()
                                            })
                                    }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        deleteStudent(oldData)
                                            .then(() => {
                                                setIsLoaded(false)
                                                resolve()
                                            })
                                    }, 600);
                                }),
                        }}
                    />
                </div>
            )
            : timetableUI ? (
                <div className={classes.timetableContainer}>
                    <div className={classes.select}>
                        <TextField
                            select
                            id="outlined-select-currency"
                            label="Grade"
                            value={grade}
                            onChange={handleGradeChange}
                            variant="outlined"
                            helperText="Please select a grade"
                        >
                            {allGrades.map((gradeItem) => (
                                <MenuItem key={gradeItem} value={gradeItem}>
                                    {gradeItem}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            id="outlined-select-currency"
                            label="Classroom"
                            value={classroom}
                            onChange={handleClassroomChange}
                            variant="outlined"
                            helperText="Please select a classroom"
                        >
                            {allClassrooms.map((classroomItem) => (
                            <MenuItem key={classroomItem} value={classroomItem}>
                                {classroomItem}
                            </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className={classes.main}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Day/Time</TableCell>
                                            {classesTime.map((classTime, i) => (
                                                <TableCell key={i} align="center">
                                                    {classTime.start} - {classTime.finish}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {weekDays.map((day, i) => (
                                            <TableRow key={day}>
                                                <TableCell component="th" scope="row" >
                                                    {day}
                                                </TableCell>
                                                {existingGradesClassrooms[grade] && existingGradesClassrooms[grade].includes(classroom) 
                                                ? timetable[day].map((subject, j) => (
                                                    <TableCell key={j} align="center" >
                                                        <TextField id="outlined-basic" label="Subject" variant="outlined" defaultValue={subject}
                                                         size={'small'} onChange={(e) => handleAddSubject(day, j, e.target.value)}/>
                                                    </TableCell>
                                                ))
                                                :  classesTime.map((classTime, j) => (
                                                    <TableCell key={j} align="center" >
                                                        <TextField id="outlined-basic" label="Subject" variant="outlined" required={true}
                                                        defaultValue={''} size={'small'} onChange={(e) => handleAddSubject(day, j, e.target.value)}/>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className={classes.form}>
                                <Button type="submit" size={'small'} variant="contained" color="primary"
                                    onClick={() => {
                                        console.log(timetable)
                                        let gradeTimetable = timetables[grade]
                                        gradeTimetable[classroom] = timetable
                                        addTimetable(grade, gradeTimetable).then(() => setIsLoaded(false))
                                    }}>
                                    {existingGradesClassrooms[grade] && existingGradesClassrooms[grade].includes(classroom) ? "Update" : "Add"}
                                </Button>
                            </div>
                    </div>
                </div>
            )
            : (
                <div className={classes.classesContainer}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div className={classes.classesBody}>
                  {activeStep === steps.length ? (
                    <div>
                      <Typography className={classes.instructions}>All steps completed</Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div>
                      {getStepContent(activeStep)}
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
    )

    const selectUI = (text) => {
        console.log(text)
        if (text === 'Students'){
            setStudentsUI(true)
            setTimetableUI(false)
        } else if (text === 'Timetables'){
            setStudentsUI(false)
            setTimetableUI(true)
        } else {
            setStudentsUI(false)
            setTimetableUI(false)
        }
    }

    return (
        <div className={classes.root}>
            <Appbar setDrawerState={setDrawerState} />
            <div className={classes.body} onClick={() => setDrawerState(false)}>
                <Drawer open={drawerState} >
                    <div className={classes.list} role="presentation" onClick={() => setDrawerState(false)} onKeyDown={() => setDrawerState(false)}>
                        <List>
                            {['Students', 'Timetables', 'Classes'].map((text) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} onClick={() => selectUI(text)} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                {
                    isLoaded
                        ? UI()
                        : <CircularProgress color="secondary" />
                }
            </div>
        </div>
    )

}