const inquirer = require('inquirer')
const { default: PasswordPrompt } = require('inquirer/lib/prompts/password')
const { Pool } = require('pg')
require('dotenv').config

const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
})
//functions for viewing
const viewAllEmployees = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
};

const viewAllRoles = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
};

const viewAllDepartments = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
};

//functions for adding
const addEmployee = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
};

const addRole = async () => {
    try {

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
