import Dashboard from '../views/Dashboard/Dashboard'
import Profile from '../views/Profile/Profile'
import Students from '../views/Students/Students'
import CreateStudents from '../views/Students/Create'
import UpdateStudent from '../views/Students/Update'
import Teachers from '../views/Teachers/Teachers'
import CreateTeacher from '../views/Teachers/Create'
import UpdateTeacher from '../views/Teachers/Update'
import Subjects from '../views/Subjects/Subjects'
import CreateSubjects from '../views/Subjects/Create'
import UpdateSubjects from '../views/Subjects/Update'
import Staff from '../views/Staff/Staff'
import CreateStaff from '../views/Staff/Create'
import Classes from '../views/Classes/Classes'
import Classwork from '../views/Classwork/Classwork'
import Classroom from '../views/Classroom/Classroom'
import CreateClassroom from '../views/Classroom/Create'
import UpdateClassroom from '../views/Classroom/Update'
import Assignment from '../views/Assignment/Assignment'


const routes = [
    {
        path: '',
        name: 'Dashboard',
        icon: 'clipboard',
        allowedRoles: ['superadmin','admin', 'teacher', 'student'],
        component: Dashboard,
        sidebar: true    
    },
    {
        path: '/mi-perfil',
        name: '',
        icon: 'users',
        allowedRoles: ['superadmin','admin', 'teacher', 'student'],
        component: Profile,
        sidebar: false    
    },
    {
        path: '/estudiantes',
        name: 'Estudiantes',
        icon: 'users',
        allowedRoles: ['superadmin','admin'],
        component: Students,
        sidebar: true
    },
    {
        path: '/estudiantes/crear',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: CreateStudents,
        sidebar: false
    },
    {
        path: '/estudiantes/:id',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: UpdateStudent,
        sidebar: false
    },
    {
        path: '/docentes',
        name: 'Docentes',
        icon: 'users',
        allowedRoles: ['superadmin','admin'],
        component: Teachers,
        sidebar: true
    },
    {
        path: '/docentes/crear',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: CreateTeacher,
        sidebar: false
    },
    {
        path: '/docentes/:id',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: UpdateTeacher,
        sidebar: false
    },
    {
        path: '/materias',
        name: 'Materias',
        icon: 'book-open',
        allowedRoles: ['superadmin','admin'],
        component: Subjects,
        sidebar: true
    },
    {
        path: '/materias/crear',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: CreateSubjects,
        sidebar: false
    },
    {
        path: '/materias/:id',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: UpdateSubjects,
        sidebar: false
    },
    {
        path: '/personal',
        name: 'Personal',
        icon: 'users',
        allowedRoles: ['superadmin','admin'],
        component: Staff,
        sidebar: false //Edit this to true
    },
    {
        path: '/personal/crear',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: CreateStaff,
        sidebar: false
    },
    {
        path: '/classroom',
        name: 'Classroom',
        icon: 'users',
        allowedRoles: ['superadmin','admin'],
        component: Classroom,
        sidebar: true
    },
    {
        path: '/classroom/crear',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: CreateClassroom,
        sidebar: false
    },
    {
        path: '/classroom/:id',
        name: '',
        icon: '',
        allowedRoles: ['superadmin','admin'],
        component: UpdateClassroom,
        sidebar: false
    },
    {
        path: '/clases',
        name: 'Clases',
        icon: 'book-open',
        allowedRoles: ['teacher','student'],
        component: Classes,
        sidebar: true
    },
    {
        path: '/clases/:id',
        name: '',
        icon: '',
        allowedRoles: ['teacher','student'],
        component: Classwork,
        sidebar: false
    },
    {
        path: '/asignacion/:id',
        name: '',
        icon: '',
        allowedRoles: ['teacher','student'],
        component: Assignment,
        sidebar: false
    },
];

export default routes;