import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const EnhancedResumeForm = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (field, value) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  const handleNestedChange = (field, subfield, value) => {
    setResumeData({
      ...resumeData,
      [field]: {
        ...resumeData[field],
        [subfield]: value,
      },
    });
  };

  const handleArrayAdd = (field, newItem) => {
    setResumeData({
      ...resumeData,
      [field]: [...(resumeData[field] || []), newItem],
    });
  };

  const handleArrayRemove = (field, index) => {
    const newArray = [...resumeData[field]];
    newArray.splice(index, 1);
    setResumeData({
      ...resumeData,
      [field]: newArray,
    });
  };

  const handleArrayUpdate = (field, index, key, value) => {
    const newArray = [...resumeData[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setResumeData({
      ...resumeData,
      [field]: newArray,
    });
  };

  // Personal Info Tab
  const PersonalInfoTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={resumeData.personalInfo?.name || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'name', e.target.value)}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={resumeData.personalInfo?.email || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'email', e.target.value)}
            placeholder="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={resumeData.personalInfo?.phone || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={resumeData.personalInfo?.location || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            value={resumeData.personalInfo?.linkedin || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="url"
            value={resumeData.personalInfo?.github || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'github', e.target.value)}
            placeholder="github.com/johndoe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Website/Portfolio</label>
          <input
            type="url"
            value={resumeData.personalInfo?.website || ''}
            onChange={(e) => handleNestedChange('personalInfo', 'website', e.target.value)}
            placeholder="www.johndoe.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
      </div>
    </div>
  );

  // Summary Tab
  const SummaryTab = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
      <textarea
        value={resumeData.summary || ''}
        onChange={(e) => handleChange('summary', e.target.value)}
        placeholder="Brief professional summary highlighting your key strengths, experience, and career goals..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
        rows="6"
      />
      <p className="text-xs text-gray-500 mt-2">Tip: Keep it concise (3-4 sentences). Use AI to generate a professional summary!</p>
    </div>
  );

  // Experience Tab
  const ExperienceTab = () => {
    const [exp, setExp] = useState({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });

    const addExperience = () => {
      if (exp.company.trim() && exp.position.trim()) {
        handleArrayAdd('experience', exp);
        setExp({ company: '', position: '', startDate: '', endDate: '', description: '', current: false });
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Add Experience</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => setExp({ ...exp, company: e.target.value })}
                placeholder="Google"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Position *</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => setExp({ ...exp, position: e.target.value })}
                placeholder="Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => setExp({ ...exp, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => setExp({ ...exp, endDate: e.target.value })}
                disabled={exp.current}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-100"
              />
              <label className="flex items-center mt-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => setExp({ ...exp, current: e.target.checked, endDate: '' })}
                  className="mr-2"
                />
                Currently working here
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => setExp({ ...exp, description: e.target.value })}
              placeholder="Describe your responsibilities, achievements, and impact..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              rows="3"
            />
          </div>
          
          <button
            onClick={addExperience}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {resumeData.experience?.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{item.position}</h4>
                  <p className="text-sm text-gray-600">{item.company}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.startDate} - {item.current ? 'Present' : item.endDate}
                  </p>
                  {item.description && (
                    <p className="text-xs text-gray-700 mt-2">{item.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleArrayRemove('experience', index)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Education Tab
  const EducationTab = () => {
    const [edu, setEdu] = useState({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      current: false,
    });

    const addEducation = () => {
      if (edu.institution.trim() && edu.degree.trim()) {
        handleArrayAdd('education', edu);
        setEdu({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', current: false });
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Add Education</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Institution *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
                placeholder="Stanford University"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
                placeholder="Bachelor of Science"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => setEdu({ ...edu, field: e.target.value })}
                placeholder="Computer Science"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => setEdu({ ...edu, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">End Date / Expected</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => setEdu({ ...edu, endDate: e.target.value })}
                disabled={edu.current}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-100"
              />
              <label className="flex items-center mt-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={edu.current}
                  onChange={(e) => setEdu({ ...edu, current: e.target.checked, endDate: '' })}
                  className="mr-2"
                />
                Currently enrolled
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => setEdu({ ...edu, gpa: e.target.value })}
                placeholder="3.8/4.0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
          
          <button
            onClick={addEducation}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Education
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {resumeData.education?.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{item.degree} {item.field && `in ${item.field}`}</h4>
                  <p className="text-sm text-gray-600">{item.institution}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.startDate} - {item.current ? 'Present' : item.endDate}
                  </p>
                  {item.gpa && (
                    <p className="text-xs text-gray-600 mt-1">GPA: {item.gpa}</p>
                  )}
                </div>
                <button
                  onClick={() => handleArrayRemove('education', index)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Skills Tab (Existing with improvements)
  const SkillsTab = () => {
    const [skillInput, setSkillInput] = useState('');

    const skillCategories = [
      'Programming Languages',
      'Frameworks & Libraries',
      'Tools & Technologies',
      'Soft Skills',
      'Other Skills'
    ];

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g., React, Node.js, Python, Leadership"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && skillInput.trim()) {
                handleArrayAdd('skills', skillInput.trim());
                setSkillInput('');
              }
            }}
          />
          <button
            onClick={() => {
              if (skillInput.trim()) {
                handleArrayAdd('skills', skillInput.trim());
                setSkillInput('');
              }
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {resumeData.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-200"
            >
              {skill}
              <button
                onClick={() => handleArrayRemove('skills', index)}
                className="text-gray-600 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-xs text-blue-800">
            <strong>💡 Tip:</strong> Add 10-15 relevant skills. Include both technical and soft skills. Skills from your GitHub/integrations will be auto-added!
          </p>
        </div>
      </div>
    );
  };

  // Projects, Courses, Achievements tabs remain from original ResumeForm.jsx
  const ProjectsTab = () => {
    const [project, setProject] = useState({ title: '', description: '', technologies: '', link: '', date: '' });

    const addProject = () => {
      if (project.title.trim()) {
        handleArrayAdd('projects', project);
        setProject({ title: '', description: '', technologies: '', link: '', date: '' });
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Add Project</h4>
          
          <input
            type="text"
            placeholder="Project Title *"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            rows="3"
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={project.technologies}
            onChange={(e) => setProject({ ...project, technologies: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <input
            type="url"
            placeholder="Project Link (optional)"
            value={project.link}
            onChange={(e) => setProject({ ...project, link: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <input
            type="month"
            placeholder="Completion Date"
            value={project.date}
            onChange={(e) => setProject({ ...project, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <button
            onClick={addProject}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        <div className="space-y-3">
          {resumeData.projects?.map((proj, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{proj.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
                  {proj.technologies && (
                    <p className="text-xs text-gray-500 mt-2"><strong>Tech:</strong> {proj.technologies}</p>
                  )}
                </div>
                <button
                  onClick={() => handleArrayRemove('projects', index)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CoursesTab = () => {
    const [course, setCourse] = useState({ title: '', provider: '', completionDate: '', certificate: '' });

    const addCourse = () => {
      if (course.title.trim()) {
        handleArrayAdd('courses', course);
        setCourse({ title: '', provider: '', completionDate: '', certificate: '' });
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Add Course/Certification</h4>
          
          <input
            type="text"
            placeholder="Course Title *"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <input
            type="text"
            placeholder="Provider (e.g., Coursera, Udemy)"
            value={course.provider}
            onChange={(e) => setCourse({ ...course, provider: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <input
            type="date"
            value={course.completionDate}
            onChange={(e) => setCourse({ ...course, completionDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <input
            type="url"
            placeholder="Certificate Link (optional)"
            value={course.certificate}
            onChange={(e) => setCourse({ ...course, certificate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <button
            onClick={addCourse}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Course
          </button>
        </div>

        <div className="space-y-3">
          {resumeData.courses?.map((crs, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{crs.title}</h4>
                  <p className="text-xs text-gray-600">{crs.provider}</p>
                  {crs.completionDate && (
                    <p className="text-xs text-gray-500 mt-1">{crs.completionDate}</p>
                  )}
                </div>
                <button
                  onClick={() => handleArrayRemove('courses', index)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AchievementsTab = () => {
    const [achievement, setAchievement] = useState({ title: '', description: '', date: '' });

    const addAchievement = () => {
      if (achievement.title.trim()) {
        handleArrayAdd('achievements', achievement);
        setAchievement({ title: '', description: '', date: '' });
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Add Achievement/Award</h4>
          
          <input
            type="text"
            placeholder="Achievement Title *"
            value={achievement.title}
            onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <textarea
            placeholder="Description"
            value={achievement.description}
            onChange={(e) => setAchievement({ ...achievement, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            rows="3"
          />
          <input
            type="date"
            value={achievement.date}
            onChange={(e) => setAchievement({ ...achievement, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <button
            onClick={addAchievement}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Achievement
          </button>
        </div>

        <div className="space-y-3">
          {resumeData.achievements?.map((ach, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{ach.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{ach.description}</p>
                  {ach.date && (
                    <p className="text-xs text-gray-500 mt-1">{ach.date}</p>
                  )}
                </div>
                <button
                  onClick={() => handleArrayRemove('achievements', index)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', component: <PersonalInfoTab /> },
    { id: 'summary', label: 'Summary', component: <SummaryTab /> },
    { id: 'experience', label: 'Experience', component: <ExperienceTab /> },
    { id: 'education', label: 'Education', component: <EducationTab /> },
    { id: 'skills', label: 'Skills', component: <SkillsTab /> },
    { id: 'projects', label: 'Projects', component: <ProjectsTab /> },
    { id: 'courses', label: 'Courses', component: <CoursesTab /> },
    { id: 'achievements', label: 'Achievements', component: <AchievementsTab /> },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto space-x-1 mb-6 border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 font-medium transition text-xs whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default EnhancedResumeForm;
