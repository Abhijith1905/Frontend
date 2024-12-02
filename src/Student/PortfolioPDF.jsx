import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1a365d',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2c5282',
    fontWeight: 'bold',
    borderBottom: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 5,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f7fafc',
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2d3748',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
    color: '#4a5568',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillItem: {
    margin: 2,
    padding: '4 8',
    backgroundColor: '#ebf4ff',
    borderRadius: 4,
    fontSize: 10,
  },
});

const PortfolioPDF = ({ portfolioData }) => {
  if (!portfolioData) return null;

  const hasValidData = (data, requiredFields) => {
    return data && data.length > 0 && data.some(item => 
      requiredFields.every(field => item[field] && item[field].trim() !== '')
    );
  };

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Professional Portfolio</Text>

          {hasValidData(portfolioData.education, ['educationDegree', 'educationInstitution']) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {portfolioData.education.map((edu, index) => (
                <View key={index} style={styles.itemContainer}>
                  {edu.educationDegree && (
                    <Text style={styles.itemTitle}>{edu.educationDegree}</Text>
                  )}
                  {edu.educationInstitution && (
                    <Text style={styles.text}>{edu.educationInstitution}</Text>
                  )}
                  {edu.educationStartDate && edu.educationEndDate && (
                    <Text style={styles.text}>{`${edu.educationStartDate} - ${edu.educationEndDate}`}</Text>
                  )}
                  {edu.fieldOfStudy && (
                    <Text style={styles.text}>{`Field: ${edu.fieldOfStudy}`}</Text>
                  )}
                  {edu.grade && (
                    <Text style={styles.text}>{`Grade: ${edu.grade}`}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {hasValidData(portfolioData.skills, ['skillName', 'skillLevel']) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillContainer}>
                {portfolioData.skills.map((skill, index) => (
                  skill.skillName && skill.skillLevel && (
                    <View key={index} style={styles.skillItem}>
                      <Text>{`${skill.skillName} (${skill.skillLevel})`}</Text>
                    </View>
                  )
                ))}
              </View>
            </View>
          )}

          {hasValidData(portfolioData.certifications, ['certificationName', 'certificationIssuer']) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {portfolioData.certifications.map((cert, index) => (
                <View key={index} style={styles.itemContainer}>
                  {cert.certificationName && (
                    <Text style={styles.itemTitle}>{cert.certificationName}</Text>
                  )}
                  {cert.certificationIssuer && (
                    <Text style={styles.text}>{`Issuer: ${cert.certificationIssuer}`}</Text>
                  )}
                  {cert.certificationDate && (
                    <Text style={styles.text}>{`Date: ${cert.certificationDate}`}</Text>
                  )}
                  {cert.description && (
                    <Text style={styles.text}>{cert.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {hasValidData(portfolioData.internships, ['role', 'companyName']) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Internships</Text>
              {portfolioData.internships.map((intern, index) => (
                <View key={index} style={styles.itemContainer}>
                  {intern.role && intern.companyName && (
                    <Text style={styles.itemTitle}>{`${intern.role} at ${intern.companyName}`}</Text>
                  )}
                  {intern.startDate && intern.endDate && (
                    <Text style={styles.text}>{`${intern.startDate} - ${intern.endDate}`}</Text>
                  )}
                  {intern.about && (
                    <Text style={styles.text}>{intern.about}</Text>
                  )}
                  {intern.technologiesUsed && (
                    <Text style={styles.text}>{`Technologies: ${intern.technologiesUsed}`}</Text>
                  )}
                  {intern.achievements && (
                    <Text style={styles.text}>{`Achievements: ${intern.achievements}`}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {hasValidData(portfolioData.testimonials, ['testimonialText', 'giverName']) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Testimonials</Text>
              {portfolioData.testimonials.map((testimonial, index) => (
                <View key={index} style={styles.itemContainer}>
                  {testimonial.testimonialText && (
                    <Text style={styles.text}>{testimonial.testimonialText}</Text>
                  )}
                  {testimonial.giverName && (
                    <Text style={styles.itemTitle}>
                      {`${testimonial.giverName}${testimonial.giverRole ? ` - ${testimonial.giverRole}` : ''}${testimonial.giverCompany ? `, ${testimonial.giverCompany}` : ''}`}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PortfolioPDF;