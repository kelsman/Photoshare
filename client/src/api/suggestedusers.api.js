import axios from 'axios';
import { setToken } from '../utils';
import cogoToast from 'cogo-toast';
import * as Routes from '../component/routes';
const baseUrl = process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('authToken');


