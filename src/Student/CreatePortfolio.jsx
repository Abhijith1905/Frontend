import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Main/form.css";
import UpdateState from "./UpdateState";

export default function CreatePortfolio() {
  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";
  const [portfolioData, setPortfolioData] = useState(null);
  const [projects, setProjects] = useState([]); // Holds the student's projects
  const [selectedProjectIds, setSelectedProjectIds] = useState([]); // Track selected project IDs

  const navigate = useNavigate();

  const [certifications, setCertifications] = useState([
    {
      certificationName: "",
      certificationIssuer: "",
      certificationDate: "",
      expirationDate: "",
      verificationLink: "",
      description: "",
      marksScored: "",
      honors: "",
    },
  ]);

  const [education, setEducation] = useState([
    {
      educationInstitution: "",
      educationDegree: "",
      fieldOfStudy: "",
      grade: "",
      location: "",
      educationStartDate: "",
      educationEndDate: "",
    },
  ]);

  const [internships, setInternships] = useState([
    {
      companyName: "",
      role: "",
      startDate: "",
      endDate: "",
      about: "",
      technologiesUsed: "",
      achievements: "",
      skillsGained: "",
      location: "",
    },
  ]);

  const [portfolios, setPortfolios] = useState([{ summary: "" }]);

  const [skills, setSkills] = useState([
    {
      skillName: "",
      skillLevel: "",
      skillCategory: "",
    },
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      testimonialText: "",
      giverName: "",
      giverRole: "",
      giverCompany: "",
    },
  ]);

  // Fetch existing portfolio data and projects
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
         `${config.url}/displayportfolio?studentId=${studentId}`
        );
        setPortfolioData(response.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setPortfolioData(null);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
         `${config.url}/viewallprojects?studentId=${studentId}`
        );
        setProjects(response.data); // Save fetched projects to state
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (studentId) {
      fetchPortfolioData();
      fetchProjects();
    }
  }, [studentId]);

  // Update states with studentId
  useEffect(() => {
    setCertifications((prev) => prev.map((cert) => ({ ...cert, studentId })));
    setEducation((prev) => prev.map((edu) => ({ ...edu, studentId })));
    setInternships((prev) => prev.map((intern) => ({ ...intern, studentId })));
    setPortfolios((prev) => prev.map((port) => ({ ...port, studentId })));
    setSkills((prev) => prev.map((skill) => ({ ...skill, studentId })));
    setTestimonials((prev) => prev.map((test) => ({ ...test, studentId })));
  }, [studentId]);

  // Handle project selection (store only projectId)
  const handleProjectSelection = (project) => {
    setSelectedProjectIds((prevSelectedIds) => {
      // Check if the projectId is already selected
      if (prevSelectedIds.includes(project.projectId)) {
        // If selected, remove it
        return prevSelectedIds.filter((id) => id !== project.projectId);
      } else {
        // If not selected, add it
        return [...prevSelectedIds, project.projectId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Helper function to remove empty entries
    const removeEmptyFields = (array, fields) => {
      return array.filter((item) =>
        fields.some((field) => typeof item[field] === "string" && item[field]?.trim())
      );
    };
  
    const filteredCertifications = removeEmptyFields(certifications, [
      "certificationName",
      "certificationIssuer",
      "certificationDate",
      "expirationDate",
      "verificationLink",
      "description",
      "marksScored",
      "honors",
    ]);
  
    const filteredEducation = removeEmptyFields(education, [
      "educationInstitution",
      "educationDegree",
      "fieldOfStudy",
      "grade",
      "location",
      "educationStartDate",
      "educationEndDate",
    ]);
  
    const filteredInternships = removeEmptyFields(internships, [
      "companyName",
      "role",
      "startDate",
      "endDate",
      "about",
      "technologiesUsed",
      "achievements",
      "skillsGained",
      "location",
    ]);
  
    const filteredPortfolios = removeEmptyFields(portfolios, ["summary"]);
  
    const filteredSkills = removeEmptyFields(skills, [
      "skillName",
      "skillLevel",
      "skillCategory",
    ]);
  
    const filteredTestimonials = removeEmptyFields(testimonials, [
      "testimonialText",
      "giverName",
      "giverRole",
      "giverCompany",
    ]);
  
    try {
      // Convert selectedProjectIds to integers
      const selectedProjectIdsAsIntegers = selectedProjectIds.map(id => parseInt(id, 10));
  
      console.log("Selected Project IDs (as integers):", selectedProjectIdsAsIntegers);
  
      const response = await axios.post("http://localhost:2025/createportfolio", {
        certifications: filteredCertifications,
        education: filteredEducation,
        internships: filteredInternships,
        portfolios: filteredPortfolios,
        skills: filteredSkills,
        testimonials: filteredTestimonials,
        projectIds: selectedProjectIdsAsIntegers, // Send project IDs as integers
      });
  
      console.log("Response:", response.data);
      navigate("/viewportfolio");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const formStyle = {
    maxWidth: "800px",
    margin: "auto",
    paddingTop: "50px",
    borderRadius: "10px",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%",
    backgroundColor: "#f0f0f0",
    color: "#000",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "10px 5px",
    backgroundColor: "#4a4a75",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  if (portfolioData) {
    return <UpdateState />;
  }


  return (
  <div style={formStyle}>
  <form className="custom-form" onSubmit={handleSubmit}>
    {/* Summary Section */}
    <br />
    <br />
    <br />
    <h2 style={{ color: "black" }}>
      <u>Design Your Portfolio</u>
    </h2>
    <br></br>
    <div style={sectionStyle}>
      <h2 style={{ color: "black" }}>Summary</h2>
      {portfolios.map((portfolio, index) => (
        <textarea
          key={index}
          placeholder="Portfolio Summary"
          value={portfolio.summary || ""}
          onChange={(e) =>
            setPortfolios((prev) =>
              prev.map((item, i) =>
                i === index ? { ...item, summary: e.target.value } : item
              )
            )
          }
          style={{
            ...inputStyle,
            resize: "none", // Disable resizing
            height: "150px", // Set height for a larger area
            width: "700px", // Set width to occupy full container
            fontSize: "16px", // Adjust font size for readability
            padding: "10px", // Add padding for better aesthetics
          }}
          required
        />
      ))}
    </div>
{/* Skills Section */}
<div style={sectionStyle}>
  <h2 style={{ color: "black" }}>Skills</h2>
  {skills.map((skill, index) => (
    <div key={index}>
      {/* Skill Name Input */}
      <input 
        type="text"
        placeholder="Skill Name"
        value={skill.skillName || ""}
        onChange={(e) =>
          setSkills((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, skillName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Skill Level Dropdown */}
      <select
        value={skill.skillLevel || ""}
        onChange={(e) =>
          setSkills((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, skillLevel: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      >
        <option value="">Select Skill Level</option>
        <option value="Starter">Starter</option>
        <option value="Medium">Medium</option>
        <option value="Advanced">Advanced</option>
      </select>

      {/* Skill Category Dropdown */}
      <select
        value={skill.skillCategory || ""}
        onChange={(e) =>
          setSkills((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, skillCategory: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      >
        <option value="">Select Skill Category</option>
        <option value="Programming Language">Programming Language</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Frontend Development">Frontend Development</option>
        <option value="Backend Development">Backend Development</option>
      </select>

      {/* Add Skill Button */}
      <button
        type="button"
        onClick={() => addItem(setSkills, { skillName: "", skillLevel: "", skillCategory: "" })}
        style={buttonStyle}
      >
        Add Skill
      </button>

      {/* Remove Skill Button */}
      <button
        type="button"
        onClick={() => removeItem(setSkills, index)}
        style={buttonStyle}
        disabled={skills.length === 1}
      >
        Remove Skill
      </button>
    </div>
  ))}
</div>

  {/* Projects Section */}
  <div style={sectionStyle}>
          <h3>Select Projects for Portfolio</h3>
          {projects.map((project) => (
            <div key={project.projectId}>
              <label style={{ color: "black" }}>
                <input
                  type="checkbox"
                  onChange={() => handleProjectSelection(project)}
                  checked={selectedProjectIds.includes(project.projectId)}
                />
                {project.title}
              </label>
            </div>
          ))}
          <div>
            <h4>Selected Projects:</h4>
            <pre>{selectedProjectIds}</pre>
          </div>
        </div>

 {/* Certifications Section */}
<div style={sectionStyle}>
  <h2 style={{ color: "black" }}>Certifications</h2>
  {certifications.map((cert, index) => (
    <div key={index}>
      {/* Certification Name */}
      <input
        type="text"
        placeholder="Certification Name"
        value={cert.certificationName || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, certificationName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Certification Issuer */}
      <input
        type="text"
        placeholder="Certification Issuer"
        value={cert.certificationIssuer || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, certificationIssuer: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Certification Date */}
      <input
        type="date"
        value={cert.certificationDate || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, certificationDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Expiration Date */}
      <input
        type="date"
        placeholder="Expiration Date (optional)"
        value={cert.expirationDate || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, expirationDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        value={cert.description || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, description: e.target.value } : item
            )
          )
        }
        style={{ ...inputStyle, height: "80px",  resize: "none", }}
      />

      {/* Marks Scored */}
      <input
        type="text"
        placeholder="Marks Scored (optional)"
        value={cert.marksScored || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, marksScored: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Honors */}
      <input
        type="text"
        placeholder="Honors (optional)"
        value={cert.honors || ""}
        onChange={(e) =>
          setCertifications((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, honors: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Add Certification Button */}
      <button
        type="button"
        onClick={() =>
          addItem(setCertifications, {
            certificationName: "",
            certificationIssuer: "",
            certificationDate: "",
            expirationDate: "",
            description: "",
            marksScored: "",
            honors: "",
          })
        }
        style={buttonStyle}
      >
        Add Certification
      </button>

      {/* Remove Certification Button */}
      <button
        type="button"
        onClick={() => removeItem(setCertifications, index)}
        style={buttonStyle}
        disabled={certifications.length === 1}
      >
        Remove Certification
      </button>
    </div>
  ))}
</div>


    {/* Education Section */}
<div className="section-content">
  <h2 style={{ color: "black" }}>Education</h2>
  {education.map((edu, index) => (
    <div key={index}>
      {/* Institution Name */}
      <input
        type="text"
        placeholder="Institution"
        value={edu.educationInstitution || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationInstitution: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Degree */}
      <input
        type="text"
        placeholder="Degree"
        value={edu.educationDegree || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationDegree: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Field of Study */}
      <input
        type="text"
        placeholder="Field of Study"
        value={edu.fieldOfStudy || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, fieldOfStudy: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Grade */}
      <input
        type="text"
        placeholder="Grade"
        value={edu.grade || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, grade: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={edu.location || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, location: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Start Date */}
      <input
        type="date"
        placeholder="Start Date"
        value={edu.educationStartDate || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationStartDate: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* End Date */}
      <input
        type="date"
        placeholder="End Date"
        value={edu.educationEndDate || ""}
        onChange={(e) =>
          setEducation((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, educationEndDate: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Add and Remove Education Buttons */}
      <button
        type="button"
        onClick={() =>
          addItem(setEducation, {
            educationInstitution: "",
            educationDegree: "",
            fieldOfStudy: "",
            grade: "",
            location: "",
            educationStartDate: "",
            educationEndDate: "",
          })
        }
        style={buttonStyle}
      >
        Add Education
      </button>
      <button
        type="button"
        onClick={() => removeItem(setEducation, index)}
        disabled={education.length === 1}
        style={buttonStyle}
      >
        Remove Education
      </button>
    </div>
  ))}
</div>

{/* Internships Section */}
<div className="section-content">
  <h2 style={{ color: "black" }}>Internships</h2>
  {internships.map((internship, index) => (
    <div key={index} style={{ marginBottom: "20px", padding: "10px" }}>
      {/* Company Name */}
      <input
        type="text"
        placeholder="Company Name"
        value={internship.companyName || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, companyName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Role */}
      <input
        type="text"
        placeholder="Role"
        value={internship.role || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, role: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Start Date */}
      <input
        type="date"
        placeholder="Start Date"
        value={internship.startDate || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, startDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* End Date */}
      <input
        type="date"
        placeholder="End Date"
        value={internship.endDate || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, endDate: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* About */}
      <textarea
        placeholder="About the Internship"
        value={internship.about || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, about: e.target.value } : item
            )
          )
        }
        style={{...inputStyle,  resize: "none",}}
      />
      
      {/* Technologies Used */}
      <input
        type="text"
        placeholder="Technologies Used (comma separated)"
        value={internship.technologiesUsed || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, technologiesUsed: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Achievements */}
      <input
        type="text"
        placeholder="Achievements (comma separated)"
        value={internship.achievements || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, achievements: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Skills Gained */}
      <input
        type="text"
        placeholder="Skills Gained (comma separated)"
        value={internship.skillsGained || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, skillsGained: e.target.value }
                : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Internship Location */}
      <input
        type="text"
        placeholder="Location (remote, office, etc.)"
        value={internship.location || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, location: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      {/* Buttons */}
      <button
        type="button"
        onClick={() =>
          setInternships([
            ...internships,
            {
              companyName: "",
              role: "",
              startDate: "",
              endDate: "",
              about: "",
              technologiesUsed: "",
              achievements: "",
              skillsGained: "",
              location: "",
            },
          ])
        }
        style={buttonStyle}
      >
        Add Internship
      </button>
      <button
        type="button"
        onClick={() =>
          setInternships(internships.filter((_, i) => i !== index))
        }
        disabled={internships.length === 1}
        style={buttonStyle}
      >
        Remove Internship
      </button>
    </div>
  ))}
</div>



<div className="section-content">
  <h2 style={{ color: "black" }}>Testimonials</h2>
  {testimonials.map((testimonial, index) => (
    <div key={index}>
      {/* Giver's Name */}
      <input
        type="text"
        placeholder="Giver's Name"
        value={testimonial.giverName || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, giverName: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Giver's Role */}
      <input
        type="text"
        placeholder="Giver's Role"
        value={testimonial.giverRole || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, giverRole: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Giver's Company */}
      <input
        type="text"
        placeholder="Giver's Company"
        value={testimonial.giverCompany || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, giverCompany: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />
      
      {/* Testimonial Text */}
      <textarea
        placeholder="Testimonial Text"
        value={testimonial.testimonialText || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, testimonialText: e.target.value } : item
            )
          )
        }
        style={{ ...inputStyle, resize: "none", rows: 3 }}
      />

      {/* Buttons */}
      <button
        type="button"
        onClick={() =>
          addItem(setTestimonials, { testimonialText: "", giverName: "", giverRole: "", giverCompany: "" })
        }
        style={buttonStyle}
      >
        Add Testimonial
      </button>
      <button
        type="button"
        onClick={() => removeItem(setTestimonials, index)}
        disabled={testimonials.length === 1}
        style={buttonStyle}
      >
        Remove Testimonial
      </button>
    </div>
  ))}
</div>

     

       <center> <button type="submit" style={{ ...buttonStyle, marginTop: "20px" }}>
          Create
        </button></center>
      </form>
    </div>
  );
}
