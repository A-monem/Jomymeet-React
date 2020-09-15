import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import Admin  from './Admin'
import Timetable from './Timetable'
import { auth } from '../api/Firebase'

export default function Dashboard({ history }) {
    const { user } = useContext(UserContext)
    if (!user){
        return <Redirect to={'/'}/>
    } else {
        switch (user.type){
            case 'admin':
                return <Admin/>
                break
            case 'student':
                return <Timetable history={history}/>
                break
            default: 
                return <Timetable history={history}/>
        }
    }
}