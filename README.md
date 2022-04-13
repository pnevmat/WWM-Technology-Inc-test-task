## Technology stack

- TypeScript
- React
- MobX
- Webpack
- Kendo React
- GIT

## Application description

Your task is to develop simple web application from scratch using listed technologies.
Application will be comprised of two pages and a dialog:
UsersList
This page will containt datagrid with all users available from API.
Columns:

1. Username (string)
2. FullName (string)
3. LastLogin (DateTime)
4. Enabled (boolean)
   Datagrid should be sortable by all fields and filterable by Username (search). LastLogin should be formatted to human friendly format and Enabled should be represented as "Yes"/"No" text.
   Rows with Enabled set to "No" should be colored red.
   NewUserDialog
   This dialog is activated using "New user" button - placement of this button is up to you.
   Dialog should contain validated form with fields:
5. Username - max. 15 characters, only alphanumeric characters, non-empty, unique, case insensitive
6. FirstName, LastName - together max. 40 characters, both non-empty, each has max. 25 characters
7. Enabled - tri-state checkbox, must be specified ("Yes"/"No" values)
   Username uniqueness should be validated localy using data in datagrid with all users. FulName is combination of FirstName and LastName. Each cna be 25 chars long, but together can not exceed 40 chars - you have to validate, that these fields are valid on their own and combined.
   UserDetail
   This page contains details of selected user. Fields FirstName, LastName and Enabled are editable.

### API

You do not have to develop any backend functionality. As your data source create in-memory mock API. Your API mock methods should contain some delay (~ 1 second) to simulate real server delays.
All your API calls should be centralized in one place so it is easier to add error handling, HTTP request/response handling, security token handling etc.

## Evaluation criterions

### Code clarity and readability

Code is written once, but read many times by many people and it is important that you are able to write clear code (project structure, function names, variable names etc.)

### Usage of GIT

Proper usage of branches and commits is paramount. Your work should be separated into logical chunks, branches should be properly named and commits properly described.

### Feature completeness

It is expected you fulfil all parts of assignments. Missing features will disqualify you from the next round of interviews.

### Quality of work

Code should be bug free, easy to compile and build. Your code should not contain any SW antipatterns (UX, architecture, security).

### Usage of Kendo library

You should use Kendo components as much as possible - do not reinvent the wheel when you can use solution from component library.

### Design and UX

Design quality has only small part in evaluation. Your primary goal is to create feature complete and bug free application - not to play around with fonts, colors and margins.
UX (user experience) will be evaluated - your application should comply with UX basics (e.g. confirm button should be green, wait indicator during long operations, handling of non-existent pages etc.)

### Communication skills

Big part of your evaluation is going to be our mutual communication. Feel free to contact me any time if are unsure about some parts of your assignment.

## Kendo

Kendo React is a paid library. You can create trial account here https://www.telerik.com/kendo-react-ui/ or you can use versions before 4.0.0 - they are free. If you start working for us, we will provide company licence to you.

## Solution submission

Send zip archive with your solution to petr.p@mailwwm.com.
Archive should contain GIT repository with your solution - configuration files, assets and source codes.
React UI Component Library - KendoReact
Get started with the KendoReact component library: dozens of customizable UI & data visualization components, including Data Grid, DatePicker, TreeView, and more.
React UI Component Library - KendoReact
Get started with the KendoReact component library: dozens of customizable UI & data visualization components, including Data Grid, DatePicker, TreeView, and more.
