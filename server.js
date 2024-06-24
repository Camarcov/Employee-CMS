const inquirer = require('inquirer')
const { viewAllRoles, viewAllDepartments, viewAllEmployees } = require('./index')

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
                return
                break
            case 'Update Employee Role':
                return
                break
            case 'View All Roles':
                viewAllRoles()
                break
            case 'Add Role':
                return
                break
            case 'View All Departments':
                viewAllDepartments()
                break
            case 'Add Department':
                return
                break
            case 'Quit':
                console.log('Qutting')
                break

        }
    })
}

//calls the function
init()