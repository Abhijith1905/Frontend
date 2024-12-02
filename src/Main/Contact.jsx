import React, { useState } from "react";

const Contact = () => {
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API)
    console.log(formData);
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     
      // backgroundColor: "#F0F4F8 ", // Full background color without white padding
    },
    innerContainer: {
      display: "flex",
      width: "80%",
      maxWidth: "1200px",
      backgroundColor: "#fff", // White background for the content
      color: "#234a79",
      borderRadius: "10px",
      overflow: "hidden",
    },
    leftSection: {
      flex: 1,
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#517D92",
      color: "#fff",
    },
    rightSection: {
      flex: 1,
      padding: "40px",
    },
    heading1: {
      fontSize: "36px",
      marginBottom: "20px",
    },
    heading2: {
      fontSize: "24px",
    },
    paragraph: {
      fontSize: "16px",
      marginBottom: "20px",
    },
    contactDetails: {
      fontSize: "18px",
      margin: "10px 0",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      fontSize: "16px",
      marginBottom: "5px",
      color: "#234a79",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      height: "150px", // Increased the size of the textarea
      resize: "none",
    },
    button: {
      backgroundColor: "#234a79",
      color: "#fff",
      padding: "12px 20px",
      border: "none",
      borderRadius: "5px",
      fontSize: "18px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#1d3c63",
    },
  };

  return (
    <div style={{paddingTop:"250px"}} className="content">
     <h2 style={{ color: "#4a4a75" , fontWeight: "500" }}>Contact Us</h2>
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Left section (contact info) */}
        <div style={styles.leftSection}>
          <h2 style={styles.heading2}>GET IN TOUCH</h2>
          <h1 style={styles.heading1}>Convey Your Queries to Us</h1>
          <p style={styles.paragraph}>
            Contact us for questions, technical assistance, or collaboration
            opportunities via the contact information provided.
          </p>
          <div>
            <p style={styles.contactDetails}>📞 +123-456-7890</p>
            <p style={styles.contactDetails}>📧 edusupport@edusite.com</p>
            <p style={styles.contactDetails}>📍 KLU, Vijayawada City, 522021</p>
          </div>
        </div>

        {/* Right section (contact form) */}
        <div style={styles.rightSection}>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "#234a79")}
            >
              SUBMIT NOW
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
