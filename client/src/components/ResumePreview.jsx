import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ResumePreview = ({ resumeData }) => {
  if (!resumeData) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
        <p className="text-sm">No resume data available. Fill the form to see preview.</p>
      </div>
    );
  }

  const { personalInfo, summary, skills, projects, education, experience, courses, achievements } = resumeData;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-gray-900" style={{ minHeight: '842px', width: '595px' }}>
      {/* Header - Centered Professional Style */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs text-gray-700">
          {personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Mail size={12} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Phone size={12} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {personalInfo.location}
            </span>
          )}
        </div>
        {(personalInfo?.linkedin || personalInfo?.github || personalInfo?.website) && (
          <div className="flex items-center justify-center gap-4 text-xs text-gray-700 mt-1">
            {personalInfo?.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin size={12} />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo?.github && (
              <span className="flex items-center gap-1">
                <Github size={12} />
                {personalInfo.github}
              </span>
            )}
            {personalInfo?.website && (
              <span className="flex items-center gap-1">
                <Globe size={12} />
                {personalInfo.website}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-800">{summary}</p>
        </div>
      )}

      {/* Skills - Bullet Separated */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Skills
          </h2>
          <p className="text-xs text-gray-800">
            {skills.join(' • ')}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="text-xs font-semibold">{exp.position}</h3>
                    <p className="text-xs text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-gray-800 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xs font-semibold">{project.name}</h3>
                  {project.date && (
                    <span className="text-xs text-gray-600">{project.date}</span>
                  )}
                </div>
                {project.description && (
                  <p className="text-xs text-gray-800 leading-relaxed">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="text-xs font-semibold">{edu.degree}</h3>
                    <p className="text-xs text-gray-700">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {courses && courses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Certifications & Courses
          </h2>
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-semibold">{course.name}</h3>
                  {course.date && (
                    <span className="text-xs text-gray-600">{course.date}</span>
                  )}
                </div>
                {course.provider && (
                  <p className="text-xs text-gray-700">{course.provider}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-900 pb-1 mb-2">
            Achievements & Awards
          </h2>
          <ul className="space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-xs text-gray-800 leading-relaxed">
                • {typeof achievement === 'string' ? achievement : achievement.title || achievement.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
