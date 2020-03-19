import { m as makeExports } from './exports-a4cd2707.js';
import 'string-hash';
import 'asap';

var useImportant = true; // Add !important to all style definitions

var Aphrodite = makeExports(useImportant);
var StyleSheet = Aphrodite.StyleSheet,
    StyleSheetServer = Aphrodite.StyleSheetServer,
    StyleSheetTestUtils = Aphrodite.StyleSheetTestUtils,
    css = Aphrodite.css,
    minify = Aphrodite.minify,
    flushToStyleTag = Aphrodite.flushToStyleTag,
    injectAndGetClassName = Aphrodite.injectAndGetClassName,
    defaultSelectorHandlers = Aphrodite.defaultSelectorHandlers,
    reset = Aphrodite.reset,
    resetInjectedStyle = Aphrodite.resetInjectedStyle;

export { StyleSheet, StyleSheetServer, StyleSheetTestUtils, css, defaultSelectorHandlers, flushToStyleTag, injectAndGetClassName, minify, reset, resetInjectedStyle };
