const inquirer = require('inquirer');
const { default: Choice } = require('inquirer/lib/objects/choice');
const { Pool } = require('pg')
require('dotenv').config()

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

        console.table(response.rows)

    } catch (err) {
        console.log(err)
    }
};

const viewAllRoles = async () => {
    try {
        const response = await pool.query(
            'SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id'
        );
        console.table(response.rows);

    } catch (err) {
        console.log(err)
    }
};

const viewAllDepartments = async () => {
    try {
        const response = await pool.query(
            'SELECT * FROM department'
        );
        console.table(response.rows)

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
    try {
        await pool.query(
            //inserting into employee with associated values, $# indicates the argument number 
            'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)',
            [first_name, last_name, role_id]
        )
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
            type: 'list',
            name: 'department_id',
            message: 'Select the department this role falls under',
            //made the choices an array of objects, giving each department name a value matching their department_id
            choices: [
                {
                    name: 'Produce',
                    value: 1
                },
                {
                    name: 'Front End',
                    value: 2
                },
                {
                    name: 'Warehouse',
                    value: 3
                },
            ],
        }
    ])

    const { title, salary, department_id } = roleInfo

    try {
        await pool.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        )
        console.log('Role added successfully')

    } catch (err) {
        console.log(err)
    }
};

const addDepartment = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
};

//function for updating
const updateEmployee = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
};

module.exports = { viewAllRoles, viewAllDepartments, viewAllEmployees, addEmployee, addRole }