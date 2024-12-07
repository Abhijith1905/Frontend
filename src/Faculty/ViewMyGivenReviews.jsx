import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table} from "lucide-react";
import config from '../config';

const ViewMyGivenReviews = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [projects, setProjects] = useState({});
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  const facultyData = JSON.parse(localStorage.getItem("faculty") || "{}");
  const fid = facultyData?.id;

  useEffect(() => {
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";

    const fetchFeedbacksAndProjects = async () => {
      if (!fid) {
        setMessage("Faculty data is missing. Please log in again.");
        return;
      }

      try {
        const feedbackResponse = await axios.get(
         `${config.url}/viewallfeedback?fid=${fid}`
        );

        if (feedbackResponse.status === 200 && feedbackResponse.data) {
          const feedbackData = feedbackResponse.data;
          setFeedbacks(feedbackData);

          const projectRequests = feedbackData.map((feedback) =>
            axios.get(
              `http://localhost:2025/displayproject?projectId=${feedback.projectid}`
            )
          );
          const projectResponses = await Promise.all(projectRequests);

          const projectMap = projectResponses.reduce((acc, res, idx) => {
            if (res.status === 200) {
              acc[feedbackData[idx].projectid] = {
                name: res.data.title,
                studentId: res.data.studentId,
              };
            }
            return acc;
          }, {});

          setProjects(projectMap);
        } else {
          setMessage("No feedback available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error retrieving data. Please try again later.");
      }
    };

    fetchFeedbacksAndProjects();

    return () => {
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.height = "";
    };
  }, [fid]);

  const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {
    const studentId = projects[feedback.projectid]?.studentId;
    if (studentId) {
      if (!acc[studentId]) {
        acc[studentId] = [];
      }
      acc[studentId].push(feedback);
    }
    return acc;
  }, {});

  const filteredFeedbacks = searchId
    ? { [searchId]: groupedFeedbacks[searchId] }
    : {};

  const renderStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 15.585l-6.327 3.323 1.209-7.037L.172 7.332l7.063-1.027L10 0l2.765 6.305 7.063 1.027-4.71 4.539 1.209 7.037z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (!value || /^[0-9]*$/.test(value)) {
      setSearchId(value);
      setError(""); // Clear error message when valid input is provided
    } else {
      setError("ID should be a number"); // Show error message for invalid input
    }
  };

  const isSearchEmpty = !searchId;

  return (
    <div style={{ paddingTop: "300px" }} className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Feedback History
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Review all feedback provided for student projects
          </p>
          <div className="mt-4">
            <input
              type="text"
              value={searchId}
              onChange={handleSearchChange}
              placeholder="Search by Student ID"
              className="px-4 py-2 border rounded-md"
            />
            {error && (
              <p className="text-red-500 mt-2">{error}</p> // Display error message
            )}
          </div>
        </div>

        <div className="mt-12">
          {/* Only show "No feedback yet" when searchId is entered but no records found */}
        

          {/* Show results if searchId has feedback */}
          {searchId && Object.keys(filteredFeedbacks).length > 0 && filteredFeedbacks[searchId] ? (
            Object.keys(filteredFeedbacks).map((studentId) => (
              filteredFeedbacks[studentId] && (
                <div key={studentId} className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Student ID: {studentId}
                  </h3>
                  {filteredFeedbacks[studentId].map((feedback) => (
                    <div key={feedback.feedbackId} className="mt-4">
                      <h4 className="text-lg font-medium text-gray-800">
                        Project: {projects[feedback.projectid]?.name || "N/A"}
                      </h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rating
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Feedback
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <div className="flex items-center">
                                {renderStarRating(feedback.rating)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="overflow-hidden max-w-xs">
                                <p className="truncate hover:whitespace-normal hover:overflow-visible">
                                  {feedback.comments}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(feedback.dateSubmitted).toLocaleDateString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )
            ))
          ) : (
            // Do not show "No feedback yet" message if search is empty
            !isSearchEmpty && (
              <div className="text-center py-12">
                <div className="text-center">
                  <hr />
                  <div>
                    <Table className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback yet</h3>
                    <p className="mt-1 text-sm text-gray-500">{message || "No results found"}</p>
                  </div>
                  <hr />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMyGivenReviews;
