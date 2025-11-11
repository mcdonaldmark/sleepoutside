import { loadHeaderFooter } from "./utils.mjs";
import Alert from './alert.js';

const siteAlerts = new Alert('../json/alerts.json');
siteAlerts.init();

loadHeaderFooter();