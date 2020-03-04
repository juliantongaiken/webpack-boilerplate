import '../styles/main.scss';
import $ from 'jquery';

// import local dependencies
import Router from './utils/Router';
import common from './routes/common';
import home from './routes/home';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home
});

// Load Events
$(document).ready(() => routes.loadEvents());
