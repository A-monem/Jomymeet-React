import React, {Component, createContext} from 'react'

export const UserContext = createContext()

export default class UserContextProvider extends Component{
    state = {
        user: null, 
        timetable: null
    }

    addUser = (user) => {
        this.setState({
            user
        })
    }

    addTimetable = (timetable) => {
        this.setState({
            timetable
        })
    }

    render() {
        const { user, timetable } = this.state
        return (
            <UserContext.Provider value={{ user: user, timetable: timetable, addUser: this.addUser, addTimetable: this.addTimetable}}>
                {this.props.children}
            </UserContext.Provider>
        )
      }
}