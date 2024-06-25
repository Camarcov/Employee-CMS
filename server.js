const inquirer = require('inquirer')
const { viewAllRoles, viewAllDepartments, viewAllEmployees, addEmployee, addRole, addDepartment, updateEmployeeRole } = require('./index')

//list of questions
const questions = [
    {
        type: 'list',
        name: 'response',
        message: 'What would you like to do?:',
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ],
    }
]

//on start runs this function
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(data.response)
        switch (data.response) {
            case 'View All Employees':
                viewAllEmployees()
                break
            case 'Add Employee':
                addEmployee()
                break
            case 'Update Employee Role':
                updateEmployeeRole()
                break
            case 'View All Roles':
                viewAllRoles()
                break
            case 'Add Role':
                addRole()
                break
            case 'View All Departments':
                viewAllDepartments()
                break
            case 'Add Department':
                addDepartment()
                break
            case 'Quit':
                console.log('Qutting')
                break

        }
    })
}

//calls the function
init()