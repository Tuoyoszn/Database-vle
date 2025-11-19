CREATE TABLE Students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    names TEXT NOT NULL,
    email Text NOT NULL,
    dateofbirth Date NOT NULL,
    password Text NOT NULL

);


CREATE TABLE Teachers(
    teacher_id INteger PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);



CREATE TABLE Course(
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)
CREATE TABLE Enrollments (
    enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE Grades (
    grade_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    Course TEXT NOT NULL,
    grade TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE Timetable (
    timetable_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    course_name TEXT NOT NULL,
    day_of_week TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room TEXT,
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
CREATE TABLE CourseAssignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
CREATE TABLE Attendance (
    attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
CREATE TABLE Parents (
    parent_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    wardname TEXT NOT NULL
);

CREATE TABLE ParentStudent (
    parent_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    PRIMARY KEY (parent_id, student_id),
    FOREIGN KEY (parent_id) REFERENCES Parents(parent_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);


INSERT INTO Teachers VALUES (1, 'Mr Bean', 'bean@gmail.com', 'grass');
INSERT INTO Students VALUES (2, 'Sam Drake', 'samdre@gmail.com', 2004, 'guyy' )