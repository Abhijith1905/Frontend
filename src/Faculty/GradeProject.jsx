import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming react-toastify is being used
import 'react-toastify/dist/ReactToastify.css';

function GradeProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const facultyData = JSON.parse(localStorage.getItem("faculty") || "{}");
  const fid = facultyData?.id;

  const grades = ['A', 'B', 'C', 'D', 'E', 'F'];

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`http://localhost:2025/displayproject?projectId=${id}`);
      setProjectData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch project data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const gradeProjectPayload = {
        projectId: id,
        facultyId: fid,
      };

      // Add grade and feedback only if they are provided
      if (grade) gradeProjectPayload.grade = grade;
      if (feedback) gradeProjectPayload.feedback = feedback;

      await axios.post('http://localhost:2025/gradeproject', gradeProjectPayload);

      // Show toast notification
      toast.success('Grade and feedback submitted successfully.');

      // Navigate to projectscheck after successful submission
      navigate('/projectscheck');
    } catch (err) {
      setError('Failed to submit grade and feedback');
      toast.error('Failed to submit grade and feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl border-l-4 border-red-500">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{paddingTop:"120px"}}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Grade Project</h1>
            <p className="mt-2 text-gray-600">
              Current Phase: {projectData?.phase} {/* Display the current phase */}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade (Optional)
              </label>
              <div className="flex flex-wrap gap-3">
                {grades.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${grade === g
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your feedback here..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || (!grade && !feedback)} // Disable button if neither grade nor feedback is provided
                className={`px-4 py-2 rounded-md text-sm font-medium text-white
                  ${submitting || (!grade && !feedback)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GradeProject;