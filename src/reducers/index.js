import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import students from './students'
import teachers from './teachers'
import subjects from './subjects'
import groups from './groups'
import staff from './staff'
import classrooms from './classrooms'
import classwork from './classwork'
import assignment from './assignment'
import studentassignment from './studentassignment'

export default combineReducers({
    alert, 
    auth,
    profile,
    students,
    teachers,
    subjects,
    groups,
    staff,
    classrooms,
    classwork,
    assignment,
    studentassignment
});