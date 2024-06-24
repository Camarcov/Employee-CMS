-- Inserts into associated tables with the specified values
INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Mike', 'Dean', 1),
    ('Richard', 'Smith', 2),
    ('Ryan', 'Letterman', 3),
    ('Derek', 'Bones', 4);

-- make the department table before the roles since the roles rely on the department for a key
INSERT INTO department (department_name)
VALUES
    ('Produce'),
    ('Front End'),
    ('Warehouse');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Produce Clerk', 50000, 1),
    ('Cashier', 55000, 2),
    ('Stocker', 40000, 3);