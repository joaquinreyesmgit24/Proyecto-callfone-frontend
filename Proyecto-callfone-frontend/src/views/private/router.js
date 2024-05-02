const home = ()=>import('./views/Home.vue')
const userList = ()=>import('./views/UserList.vue')
const projectList = ()=>import('./views/ProjectList.vue')
const uploadUserProject = ()=>import('./views/UploadUserProject.vue')
const contactList = ()=> import('./views/ContactList.vue')
const contact = ()=> import('./views/Contact.vue')
const contacts = ()=> import('./views/Contacts.vue')
const incidenceList = ()=> import('./views/IncidenceList.vue')


export const PrivateRoutes = [
    {
        path:'',
        redirect:'/home',
    },
    {
        path: '/home',
        component: home,
        name: 'home',
        meta: {
          title: 'home',
          menu: 'home',
        }
    },
    {
        path: '/user-list',
        component: userList,
        name: 'user-list',
        meta: {
          title: 'user-list',
          menu: 'user-list',
          requiredRole: ['Administrador', 'Supervisor']
        }
    },
    {
      path: '/project-list',
      component: projectList,
      name: 'project-list',
      meta: {
        title: 'project-list',
        menu: 'project-list',
        requiredRole: ['Administrador', 'Supervisor']
      }
    },
    {
      path: '/upload-user-project',
      component: uploadUserProject,
      name: 'upload-user-project',
      meta: {
        title: 'upload-user-project',
        menu: 'upload-user-project',
        requiredRole: ['Administrador', 'Supervisor']
    }
  },
  {
      path: '/contact-list',
      component: contactList,
      name: 'contact-list',
      meta: {
        title: 'contact-list',
        menu: 'contact-list',
    },
    
  },
  {
    path: '/contacts',
    component:contacts,
    name:'contacts',
    meta: {
      title: 'contacts',
      menu: 'contacts',
      requiredRole: 'Telefonista'
    }
  },
  {
    path: '/contact/:projectId',
    component:contact,
    name:'contact',
    meta: {
      title: 'contact',
      menu: 'contact',
      requiredRole: 'Telefonista'
  }
  },
  {
    path: '/incidence-list/:contactId',
    component: incidenceList,
    name: 'incidence-list',
    meta: {
      title: 'incidence-list',
      menu: 'incidence-list',
    }
},
]