from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect('main.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/Teachers")
def getTeachers():
    conn = sqlite3.connect("main.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    res = cur.execute('SELECT * FROM Teachers').fetchall()
    conn.close()
    return jsonify([dict(row) for row in res]), 200


@app.route("/api/Students")
def getStudents():
    conn = sqlite3.connect("main.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    res = cur.execute('SELECT * FROM Students').fetchall()
    conn.close()
    return jsonify([dict(row) for row in res]), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('pword')
    if not email or not password:
        return jsonify({"msg": "Account does not exist"}), 400
    conn = get_db()
    user = conn.execute('SELECT * FROM parents WHERE email = ?', (email,)).fetchone()
    print(user)
    conn.close()
    if user and user['password'] == password:
        return jsonify({"msg": "logged in"}), 200 
    else:
        return jsonify({"msg": "Login Invalid"}), 401


@app.route('/Psignup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    parent_email = data['email']
    parent_password = data['password']
    wardname = data['ward_name'] 

    # try:
    conn = get_db()
    cursor = conn.cursor()
    res = cursor.execute('SELECT * FROM Parents WHERE email = ?', (parent_email,)).fetchone()
    print(wardname)
    if res:
        conn.close()
        return jsonify({'error': 'Email already exists'}), 406
    else:
        res = cursor.execute('SELECT * FROM Students WHERE names = ?', (wardname,)).fetchone()#TODO - Check to see if the student exists
        print(res)
        student = res

    print(student)
    if len(student) == 1:
        conn.close()
        return jsonify({'error': 'Student (ward) not found'}), 404

    student_id = student[0]

    cursor.execute(
        'INSERT INTO Parents (name, email, password, wardname) VALUES (?, ?, ?, ?)',
        (name, parent_email, parent_password, wardname)
    )
    parent_id = cursor.lastrowid

    cursor.execute(
        'INSERT INTO ParentStudent (parent_id, student_id) VALUES (?, ?)',
        (parent_id, student_id)
    )
    conn.commit()
    conn.close()

    return jsonify({'message': 'Signup successful'}), 201

    # except Exception as e:
    #     print("Error during signup:", e)
    #     return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route("/api/getAttendanceList", methods=["GET"])
def getAttendanceList():

    conn = get_db()
    cur = conn.cursor()

    query = "SELECT student_id AS id, names AS name FROM Students"
    cur.execute(query)
    rows = cur.fetchall()
    conn.close()

    
    students = [{"id": row["id"], "name": row["name"]} for row in rows]
    print(students)
    return jsonify(students), 200




@app.route("/api/attendance", methods=["POST"])
def save_attendance():
    data = request.get_json()
    course_id = data["course_id"]
    date = data["date"]
    attendance_records = data["attendance"]

    conn = get_db()
    cur = conn.cursor()

    for record in attendance_records:
        student_id = record["student_id"]
        status = record["status"]
        
        cur.execute("""
            INSERT INTO Attendance (student_id, course_id, date, status)
            VALUES (?, ?, ?, ?)
        """, (student_id, course_id, date, status))

    conn.commit()
    conn.close()
    return jsonify({"message": "Attendance saved successfully!"})





if __name__ == "__main__":
    app.run()