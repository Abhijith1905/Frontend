import React from "react";


const UploadProjectFurther = () => {
  

  const styles = {
    content:
    {
      paddingTop:"150px",
    },
    page: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#1e3d6b",
      color: "white",
      padding: "20px",
      textAlign: "center",
    },

    logo: {
      fontSize: "1.5em",
      fontWeight: "bold",
    },

    active: {
      color: "#c0c0c0",
    },
    uploadSection: {
      backgroundColor: "white",
      color: "black",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "350px",
      margin: "0 auto",
    },
    uploadBox: {
      margin: "10px 0",
    },
    button: {
      backgroundColor: "#003366",
      color: "white",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      borderRadius: "5px",
      marginTop: "10px",
    },
    cloudUpload: {
      marginTop: "20px",
    },
    cloudButton: {
      width: "100%",
      padding: "15px",
      fontSize: "1.1em",
    },
  };
  return (
    <div style={styles.content}>
      <div style={styles.page}>
       
        <div style={styles.uploadSection}>
          <h2>UPLOAD</h2>
          <div style={styles.uploadBox}>
            <label>Upload Project images</label>
            <input
              type="file"
            />
          </div>
          <div style={styles.uploadBox}>
            <label>Upload Description PDF</label>
            <input
              type="file"
            />
          </div>
          <div style={styles.uploadBox}>
            <label>Upload Working Video</label>
            <input
              type="file"
            />
          </div>
          <div style={styles.cloudUpload}>
            <button style={{ ...styles.button, ...styles.cloudButton }}>
              CLICK HERE TO UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProjectFurther;
