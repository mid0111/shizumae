import Main from './components/main.jsx';
import News from './components/news/newsContainer.jsx';
import Shops from './components/shop/shopContainer.jsx';

module.exports = {
  path: '/',
  component: Main,
  indexRoute: { component: News },
  childRoutes: [
    { path: 'shops', component: Shops }
  ]
};
