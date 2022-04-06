# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
wwm-technology-inc-test-task
Technology stack
TypeScript
React
MobX
Webpack
Kendo React
GIT
Application description
Your task is to develop simple web application from scratch using listed technologies. Application will be comprised of two pages and a dialog: UsersList This page will containt datagrid with all users available from API. Columns:

Username (string)
FullName (string)
LastLogin (DateTime)
Enabled (boolean) Datagrid should be sortable by all fields and filterable by Username (search). LastLogin should be formatted to human friendly format and Enabled should be represented as "Yes"/"No" text. Rows with Enabled set to "No" should be colored red. NewUserDialog This dialog is activated using "New user" button - placement of this button is up to you. Dialog should contain validated form with fields:
Username - max. 15 characters, only alphanumeric characters, non-empty, unique, case insensitive
FirstName, LastName - together max. 40 characters, both non-empty, each has max. 25 characters
Enabled - tri-state checkbox, must be specified ("Yes"/"No" values) Username uniqueness should be validated localy using data in datagrid with all users. FulName is combination of FirstName and LastName. Each cna be 25 chars long, but together can not exceed 40 chars - you have to validate, that these fields are valid on their own and combined. UserDetail This page contains details of selected user. Fields FirstName, LastName and Enabled are editable.
API
You do not have to develop any backend functionality. As your data source create in-memory mock API. Your API mock methods should contain some delay (~ 1 second) to simulate real server delays. All your API calls should be centralized in one place so it is easier to add error handling, HTTP request/response handling, security token handling etc.

Evaluation criterions
Code clarity and readability
Code is written once, but read many times by many people and it is important that you are able to write clear code (project structure, function names, variable names etc.)

Usage of GIT
Proper usage of branches and commits is paramount. Your work should be separated into logical chunks, branches should be properly named and commits properly described.

Feature completeness
It is expected you fulfil all parts of assignments. Missing features will disqualify you from the next round of interviews.

Quality of work
Code should be bug free, easy to compile and build. Your code should not contain any SW antipatterns (UX, architecture, security).

Usage of Kendo library
You should use Kendo components as much as possible - do not reinvent the wheel when you can use solution from component library.

Design and UX
Design quality has only small part in evaluation. Your primary goal is to create feature complete and bug free application - not to play around with fonts, colors and margins. UX (user experience) will be evaluated - your application should comply with UX basics (e.g. confirm button should be green, wait indicator during long operations, handling of non-existent pages etc.)

Communication skills
Big part of your evaluation is going to be our mutual communication. Feel free to contact me any time if are unsure about some parts of your assignment.

Kendo
Kendo React is a paid library. You can create trial account here https://www.telerik.com/kendo-react-ui/ or you can use versions before 4.0.0 - they are free. If you start working for us, we will provide company licence to you.

Solution submission
Send zip archive with your solution to petr.p@mailwwm.com. Archive should contain GIT repository with your solution - configuration files, assets and source codes. React UI Component Library - KendoReact Get started with the KendoReact component library: dozens of customizable UI & data visualization components, including Data Grid, DatePicker, TreeView, and more. React UI Component Library - KendoReact Get started with the KendoReact component library: dozens of customizable UI & data visualization components, including Data Grid, DatePicker, TreeView, and more.
