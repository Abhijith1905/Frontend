import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";

export default function UpdatePortfolio() {
  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";
  const [portfolioData, setPortfolioData] = useState(null);

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
      honors: ""
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
      achievements:"",
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

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2025/displayportfolio?studentId=${studentId}`
        );
        const data = response.data;
        
        setCertifications(data.certifications?.length ? data.certifications : certifications);
        setEducation(data.education?.length ? data.education : education);
        setInternships(data.internships?.length ? data.internships : internships);
        setPortfolios(data.portfolios?.length ? data.portfolios : portfolios);
        setSkills(data.skills?.length ? data.skills : skills);
        setTestimonials(data.testimonials?.length ? data.testimonials : testimonials);
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setPortfolioData(null);
      }
    };

    if (studentId) {
      fetchPortfolioData();
    }
  }, [studentId]);

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

    const removeEmptyFields = (array, Fields) => {
      return array.filter((item) =>
        Fields.some((field) => item[field]?.trim())
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
      const response = await axios.put(
        `http://localhost:2025/updateportfolio?sid=${studentId}`,
        {
          certifications: filteredCertifications,
          education: filteredEducation,
          internships: filteredInternships,
          portfolios: filteredPortfolios,
          skills: filteredSkills,
          testimonials: filteredTestimonials,
        }
      );
      navigate("/viewportfolio");
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
    backgroundColor: "#f0f0f0",
    color: "#000",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    width: "100%",
  };

  const sectionStyle = {
    marginBottom: "20px",
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

  const formStyle = {
    maxWidth: "800px",
    margin: "auto",
    paddingTop: "50px",
    borderRadius: "10px",
  };

  const isPortfolioEmpty = 
  !portfolioData || 
  Object.values(portfolioData).every(section => section.length === 0);

if (isPortfolioEmpty) {
  return <EmptyState />;
}

  return (
    <div style={formStyle}>
      <form className="custom-form" onSubmit={handleSubmit}>
        <br />
        <br />
        <br />
        <h2 style={{ color: "black" }}>
          <u>Update Your Portfolio</u>
        </h2>
        <br></br>

        {/* Summary Section */}
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
                resize: "none",
                height: "150px",
                width: "700px",
                fontSize: "16px",
                padding: "10px",
              }}
            />
          ))}
        </div>

       {/* Skills Section */}
<div style={sectionStyle}>
  <h2 style={{ color: "black" }}>Skills</h2>
  {skills.map((skill, index) => (
    <div key={index}>
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

      <button
        type="button"
        onClick={() => addItem(setSkills, { skillName: "", skillLevel: "", skillCategory: "" })}
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
          <h2 style={{ color: "black" }}>Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index}>
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
        <div style={sectionStyle}>
          <h2 style={{ color: "black" }}>Education</h2>
          {education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Institution"
                value={edu.educationInstitution || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, educationInstitution: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Degree"
                value={edu.educationDegree || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, educationDegree: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Field of Study"
                value={edu.fieldOfStudy || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, fieldOfStudy: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Grade"
                value={edu.grade || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, grade: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Location"
                value={edu.location || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, location: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

              <input
                type="date"
                placeholder="Start Date"
                value={edu.educationStartDate || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, educationStartDate: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

              <input
                type="date"
                placeholder="End Date"
                value={edu.educationEndDate || ""}
                onChange={(e) =>
                  setEducation((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, educationEndDate: e.target.value } : item
                    )
                  )
                }
                style={inputStyle}
              />

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

        <div style={sectionStyle}>
  <h2 style={{ color: "black" }}>Internships</h2>
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
        style={inputStyle}
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
        style={inputStyle}
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
        style={inputStyle}
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
        style={inputStyle}
      />

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

      <input
        type="text"
        placeholder="Achievements (comma separated)"
        value={internship.achievements || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, achievements: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Skills Gained (comma separated)"
        value={internship.skillsGained || ""}
        onChange={(e) =>
          setInternships((prev) =>
            prev.map((item, i) =>
              i === index ? { ...item, skillsGained: e.target.value } : item
            )
          )
        }
        style={inputStyle}
      />

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

      <button
        type="button"
        onClick={() =>
          addItem(setInternships, {
            companyName: "",
            role: "",
            startDate: "",
            endDate: "",
            about: "",
            technologiesUsed: "",
            achievements: "",
            skillsGained: "",
            location: "",
          })
        }
        style={buttonStyle}
      >
        Add Internship
      </button>

      <button
        type="button"
        onClick={() => removeItem(setInternships, index)}
        disabled={internships.length === 1}
        style={buttonStyle}
      >
        Remove Internship
      </button>
    </div>
  ))}
</div>


        {/* Testimonials Section */}
        <div style={sectionStyle}>
          <h2 style={{ color: "black" }}>Testimonials</h2>
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
                style={inputStyle}
              />

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

              <button
                type="button"
                onClick={() =>
                  addItem(setTestimonials, {
                    testimonialText: "",
                    giverName: "",
                    giverRole: "",
                    giverCompany: "",
                  })
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

        <center>
          <button type="submit" style={{ ...buttonStyle, marginTop: "20px" }}>
            Update Portfolio
          </button>
        </center>
      </form>
    </div>
  );
}