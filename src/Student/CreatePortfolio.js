import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreatePortfolio() {
  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";

  const [certifications, setCertifications] = useState([
    { certificationName: "", certificationIssuer: "", certificationDate: "", expirationDate: "" },
  ]);
  const [education, setEducation] = useState([
    { educationInstitution: "", educationDegree: "", educationStartDate: "", educationEndDate: "" },
  ]);
  const [internships, setInternships] = useState([{ companyName: "", role: "", startDate: "", endDate: "" }]);
  const [portfolios, setPortfolios] = useState([{ summary: "" }]);
  const [skills, setSkills] = useState([{ skillName: "", skillLevel: "" }]);
  const [testimonials, setTestimonials] = useState([{ testimonialText: "", giverName: "" }]);

  useEffect(() => {
    setCertifications((prev) => prev.map((cert) => ({ ...cert, studentId })));
    setEducation((prev) => prev.map((edu) => ({ ...edu, studentId })));
    setInternships((prev) => prev.map((intern) => ({ ...intern, studentId })));
    setPortfolios((prev) => prev.map((port) => ({ ...port, studentId })));
    setSkills((prev) => prev.map((skill) => ({ ...skill, studentId })));
    setTestimonials((prev) => prev.map((test) => ({ ...test, studentId })));
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2025/createportfolio", {
        certifications,
        education,
        internships,
        portfolios,
        skills,
        testimonials,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addItem = (setFunction, template) =>
    setFunction((prev) => [...prev, { ...template, studentId }]);

  const removeItem = (setFunction, index) =>
    setFunction((prev) => prev.filter((_, i) => i !== index));

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "10px 5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const formStyle = {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={formStyle}>
      <form onSubmit={handleSubmit}>
        {/* Summary Section */}
        <br></br>  <br></br>   <br></br>
        <h2><u>Design Your Portfolio</u></h2>
        <div style={sectionStyle}>
          <h2>Summary</h2>
          {portfolios.map((portfolio, index) => (
            <textarea
              key={index}
              placeholder="Portfolio Summary"
              value={portfolio.summary || ""}
              onChange={(e) =>
                setPortfolios((prev) =>
                  prev.map((item, i) => (i === index ? { ...item, summary: e.target.value } : item))
                )
              }
              style={{ ...inputStyle, resize: "none", rows: 3 }}
              required
            />
          ))}
        </div>

        {/* Skills Section */}
        <div style={sectionStyle}>
  <h2>Skills</h2>
  {skills.map((skill, index) => (
    <div key={index}>
      <input
        type="text"
        placeholder="Skill Name"
        value={skill.skillName || ""}
        onChange={(e) =>
          setSkills((prev) =>
            prev.map((item, i) => (i === index ? { ...item, skillName: e.target.value } : item))
          )
        }
        style={inputStyle}
        required
      />
      <select
        value={skill.skillLevel || ""}
        onChange={(e) =>
          setSkills((prev) =>
            prev.map((item, i) => (i === index ? { ...item, skillLevel: e.target.value } : item))
          )
        }
        style={inputStyle}
        required
      >
        <option value="">Select Skill Level</option>
        <option value="Starter">Starter</option>
        <option value="Medium">Medium</option>
        <option value="Advanced">Advanced</option>
      </select>
      <button
        type="button"
        onClick={() => addItem(setSkills, { skillName: "", skillLevel: "", studentId })}
        style={buttonStyle}
      >
        Add Skill
      </button>
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
 
        {/* Certifications Section */}
        <div style={sectionStyle}>
          <h2>Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.certificationName || ""}
                onChange={(e) =>
                  setCertifications((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, certificationName: e.target.value } : item))
                  )
                }
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Certification Issuer"
                value={cert.certificationIssuer || ""}
                onChange={(e) =>
                  setCertifications((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, certificationIssuer: e.target.value } : item))
                  )
                }
                style={inputStyle}
                required
              />
              <input
                type="date"
                value={cert.certificationDate || ""}
                onChange={(e) =>
                  setCertifications((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, certificationDate: e.target.value } : item))
                  )
                }
                style={inputStyle}
                required
              />
              <input
                type="date"
                value={cert.expirationDate || ""}
                onChange={(e) =>
                  setCertifications((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, expirationDate: e.target.value } : item))
                  )
                }
                style={inputStyle}
                required
              />
              <button
                type="button"
                onClick={() =>
                  addItem(setCertifications, { certificationName: "", certificationIssuer: "", certificationDate: "", expirationDate: "" })
                }
                style={buttonStyle}
              >
                Add Certification
              </button>
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
  <h2>Education</h2>
  {education.map((edu, index) => (
    <div key={index}>
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
        required
      />
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
        required
      />
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
        required
      />
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
        required
      />
      <button
        type="button"
        onClick={() =>
          addItem(setEducation, {
            educationInstitution: "",
            educationDegree: "",
            educationStartDate: "",
            educationEndDate: "",
          })
        }
      >
        Add Education
      </button>
      <button
        type="button"
        onClick={() => removeItem(setEducation, index)}
        disabled={education.length === 1}
      >
        Remove Education
      </button>
    </div>
  ))}
</div>

{/* Internships Section */}
<div className="section-content">
  <h2>Internships</h2>
  {internships.map((internship, index) => (
    <div key={index}>
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
        required
      />
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
        required
      />
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
        required
      />
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
        required
      />
      <button
        type="button"
        onClick={() =>
          addItem(setInternships, {
            companyName: "",
            role: "",
            startDate: "",
            endDate: "",
          })
        }
      >
        Add Internship
      </button>
      <button
        type="button"
        onClick={() => removeItem(setInternships, index)}
        disabled={internships.length === 1}
      >
        Remove Internship
      </button>
    </div>
  ))}
</div>

{/* Testimonials Section */}
<div className="section-content">
  <h2>Testimonials</h2>
  {testimonials.map((testimonial, index) => (
    <div key={index}>
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
        required
      />
      <textarea
        placeholder="Testimonial Text"
        value={testimonial.testimonialText || ""}
        onChange={(e) =>
          setTestimonials((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, testimonialText: e.target.value }
                : item
            )
          )
        }
        style={{ ...inputStyle, resize: "none", rows: 3 }}
        required
      />
      <button
        type="button"
        onClick={() =>
          addItem(setTestimonials, { testimonialText: "", giverName: "" })
        }
      >
        Add Testimonial
      </button>
      <button
        type="button"
        onClick={() => removeItem(setTestimonials, index)}
        disabled={testimonials.length === 1}
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
