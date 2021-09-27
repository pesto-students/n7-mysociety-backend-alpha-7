(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./api.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/app/api.js: Unexpected token (11:0)\n\n\u001b[0m \u001b[90m  9 |\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 10 |\u001b[39m \u001b[36mvar\u001b[39m corsOptions \u001b[33m=\u001b[39m {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 11 |\u001b[39m \u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 12 |\u001b[39m     origin\u001b[33m:\u001b[39m config\u001b[33m.\u001b[39mcors_url\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 13 |\u001b[39m \u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 14 |\u001b[39m     origin\u001b[33m:\u001b[39m \u001b[32m\"http://localhost:3000\"\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n    at Parser._raise (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:807:17)\n    at Parser.raiseWithData (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:800:17)\n    at Parser.raise (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:761:17)\n    at Parser.unexpected (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:3266:16)\n    at Parser.parseIdentifierName (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:12392:18)\n    at Parser.parseIdentifier (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:12370:23)\n    at Parser.parseMaybePrivateName (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:11660:19)\n    at Parser.parsePropertyName (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:12184:151)\n    at Parser.parsePropertyDefinition (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:12067:22)\n    at Parser.parseObjectLike (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:11983:25)\n    at Parser.parseExprAtom (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:11473:23)\n    at Parser.parseExprSubscripts (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:11119:23)\n    at Parser.parseUpdate (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:11099:21)\n    at Parser.parseMaybeUnary (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:11077:23)\n    at Parser.parseMaybeUnaryOrPrivate (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:10900:77)\n    at Parser.parseExprOps (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:10907:23)\n    at Parser.parseMaybeConditional (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:10877:23)\n    at Parser.parseMaybeAssign (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:10835:21)\n    at /Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:10797:39\n    at Parser.allowInAnd (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:12619:16)\n    at Parser.parseMaybeAssignAllowIn (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:10797:17)\n    at Parser.parseVar (/Users/maheshvora/Documents/Mahesh/ReactJs/pesto/n7-mysociety-backend-alpha-7/node_modules/@babel/parser/lib/index.js:13496:70)");

/***/ })

/******/ })));