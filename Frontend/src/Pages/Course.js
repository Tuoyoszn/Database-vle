import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const data = [
        {
          id: 1,
          title: 'Object Oriented Programming',
          instructor: 'Owen Tasker',
          progress: 70,
        },
        {
          id: 2,
          title: 'Advanced Framework',
          instructor: 'Gavin Thomas',
          progress: 45,
        },
        {
          id: 3,
          title: 'Games development',
          instructor: 'John',
          progress: 90,
        },
      ];

      setCourses(data);
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    // Navigate to the Attendance page for that course
    navigate(`/attendance/${course.id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course)}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Course Code: {course.code || `C-${course.id}`}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Instructor: {course.instructor}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700">{course.progress}% completed</p>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-gray-500 mt-4">You are not enrolled in any courses.</p>
      )}
    </div>
  );
};

export default Course;
