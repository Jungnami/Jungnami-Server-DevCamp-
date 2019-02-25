import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import ExamplePage from './components/ExamplePage';
import MembershipPage from './components/MembershipPage';
import PmsPage from './components/PmsPage';
import CmsPage from './components/CmsPage';
// import ResultComponent from './components/ResultComponent';

const baseRoutes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/examples',
    name: 'examples',
    component: ExamplePage,
  },
  {
    path: '/membership',
    name: 'membership',
    component: MembershipPage,
  },
  {
    path: '/pms',
    name: 'pms',
    component: PmsPage,
  },
  {
    path: '/cms',
    name: 'cms',
    component: CmsPage,
  },
  // {
  //   path: '/pms/detail',
  //   name: 'detail',
  //   componenet: ResultComponent,
  // },
  {
    path: '*',
    redirect: {
      name: 'home',
    },
  },
];

// const routes = baseRoutes.concat(messagesRoutes, peopleRoutes);
const routes = baseRoutes;
export default new Router({
  routes,
});
