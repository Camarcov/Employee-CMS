const inquirer = require('inquirer')
const { Pool } = require('pg')
require('dotenv').config()

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

//pg pool is what we're using the query the db
const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
})

//functions for viewing
const viewAllEmployees = async () => {
    try {
        const response = await pool.query(
            'SELECT * FROM employee'
        );

        //displaying the results
        console.table(response.rows)
        //reruns the application
        init()

    } catch (err) {
        console.log(err)
    }
};

const viewAllRoles = async () => {
    try {
        const response = await pool.query(
            'SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id'
        );
        //displaying the results
        console.table(response.rows);
        //reruns the aplication
        init()
    } catch (err) {
        console.log(err)
    }
};

const viewAllDepartments = async () => {
    try {
        const response = await pool.query(
            'SELECT * FROM department'
        );
        //display the results
        console.table(response.rows)
        //reruns the application
        init()

    } catch (err) {
        console.log(err)
    }
};

//functions for adding
const addEmployee = async () => {

    const employee = await inquirer.prompt([
        //prompts named after employee model
        {
            name: 'first_name',
            message: `Enter the new employee's first name`
        },
        {
            name: 'last_name',
            message: `Enter the new employee's last name`
        },
        {
            name: 'role_id',
            message: `Enter a unique role ID for the new employee`
        },
    ])

    //destructuring the employee object for use
    const { first_name, last_name, role_id } = employee

    //rerunning application
    init()
    try {
        await pool.query(
            //inserting into employee with associated values, $# indicates the argument number 
            'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)',
            [first_name, last_name, role_id]
        )

        //logging 'Employee Saved' just to give user some feedback
        console.log('Employee Saved')

    } catch (err) {
        console.log(err)
    }
};

const addRole = async () => {

    const roleInfo = await inquirer.prompt([
        {
            name: 'title',
            message: 'Enter the title of the new role'
        },
        {
            name: 'salary',
            message: 'Enter the salary for the new role'
        },
        {
            name: 'department_id',
            message: 'Select the department this role falls under',
        }
    ])

    //destructuring the object for use
    const { title, salary, department_id } = roleInfo

    //rerunning application
    init()

    try {
        await pool.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        )
        //logging something for user experience
        console.log('Role added successfully')

    } catch (err) {
        console.log(err)
    }
};

const addDepartment = async () => {
    //asking related questions, prompts named after model
    const newDepartment = await inquirer.prompt([
        {
            name: 'department_name',
            message: 'Name the new department'
        }
    ])
    //destructuring the object
    const { department_name } = newDepartment

    init()
    try {
        await pool.query(
            'INSERT INTO department (department_name) VALUES ($1)',
            [department_name]
        )
        console.log(`Successfully added ${department_name}`)
    } catch (err) {
        console.log(err)
    }
};

//function for updating
const updateEmployeeRole = async () => {
    const updatedRole = await inquirer.prompt([
        //asking related questions, prompts named after model
        {
            name: 'employee_id',
            message: `Enter the Employee's ID number`
        },

        {
            name: 'role_id',
            message: `Enter the new role ID for the employee`
        },
    ])

    //destructuring the object
    const { employee_id, role_id } = updatedRole

    init()
    try {
        await pool.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [role_id, employee_id]
        )
        console.log(`Role updated successfully`)
    } catch (err) {
        console.log(err)
    }
};

//function for the CMS
const init = () => {
    inquirer.prompt(questions).then((data) => {
        //essentially an if statement based on the user response, if the case is matched calls the function
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

// on start runs this function
init()
