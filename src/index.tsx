import * as React from 'react';
import * as ReactDom from 'react-dom';
import { AppProvider } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import { App } from "./App";
import "@shopify/polaris/dist/styles.css";
import "./style/style.scss";
import './img/background.jpg';

ReactDom.render(
    <AppProvider i18n={en}><App /></AppProvider>,
    document.getElementById('root')
);
