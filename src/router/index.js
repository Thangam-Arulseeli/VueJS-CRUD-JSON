import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactManagerVue from '@/views/ContactManager.vue'
import AddContactVue from '@/views/AddContact.vue'
import EditContactVue from '@/views/EditContact.vue'
import ViewContactVue from '@/views/ViewContact.vue'
import PageNotFoundVue from '@/views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect : "/contacts",
    component: HomeView
  },
  {
     path: '/contacts',
     name: 'ContactManager',
    component: ContactManagerVue
  },
  {
    path: '/contacts/add',
    name: 'AddContact',
    component: AddContactVue
  },
  {
    path: '/contacts/edit/:contactId',
    name: 'EditContact',
    component: EditContactVue
  },
  {
    path: '/contacts/view/:contactId',
    name: 'ViewContact',
    component: ViewContactVue 
  },
  {
   // path: '/*',
    path: '/:pathMatch(.*)*', 
    name: 'PageNotFound',
    component: PageNotFoundVue 
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
