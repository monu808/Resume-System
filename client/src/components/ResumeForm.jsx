import { useState } from 'react';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState('skills');

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

  const handleArrayUpdate = (field, index, value) => {
    const newArray = [...resumeData[field]];
    newArray[index] = value;
    setResumeData({
      ...resumeData,
      [field]: newArray,
    });
  };

  // Skills Section
  const SkillsTab = () => {
    const [skillInput, setSkillInput] = useState('');

    return (
      <div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g., React, Node.js, Python"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {skill}
              <button
                onClick={() => handleArrayRemove('skills', index)}
                className="ml-2 text-primary-900 hover:text-primary-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Projects Section
  const ProjectsTab = () => {
    const [project, setProject] = useState({ title: '', description: '', technologies: [], link: '' });
    const [techInput, setTechInput] = useState('');

    const addProject = () => {
      if (project.title.trim()) {
        handleArrayAdd('projects', project);
        setProject({ title: '', description: '', technologies: [], link: '' });
      }
    };

    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <textarea
          placeholder="Project Description"
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows="3"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Technologies (press Enter)"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && techInput.trim()) {
                setProject({ ...project, technologies: [...project.technologies, techInput.trim()] });
                setTechInput('');
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <input
          type="url"
          placeholder="Project Link (optional)"
          value={project.link}
          onChange={(e) => setProject({ ...project, link: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={addProject}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Add Project
        </button>

        {/* List of added projects */}
        <div className="mt-6 space-y-3">
          {resumeData.projects?.map((proj, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-900">{proj.title}</h4>
                <button
                  onClick={() => handleArrayRemove('projects', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Courses Section
  const CoursesTab = () => {
    const [course, setCourse] = useState({ title: '', provider: '', completionDate: '', certificate: '' });

    const addCourse = () => {
      if (course.title.trim()) {
        handleArrayAdd('courses', course);
        setCourse({ title: '', provider: '', completionDate: '', certificate: '' });
      }
    };

    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Provider (e.g., Coursera, Udemy)"
          value={course.provider}
          onChange={(e) => setCourse({ ...course, provider: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <input
          type="date"
          placeholder="Completion Date"
          value={course.completionDate}
          onChange={(e) => setCourse({ ...course, completionDate: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <input
          type="url"
          placeholder="Certificate Link (optional)"
          value={course.certificate}
          onChange={(e) => setCourse({ ...course, certificate: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={addCourse}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Add Course
        </button>

        <div className="mt-6 space-y-3">
          {resumeData.courses?.map((crs, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{crs.title}</h4>
                  <p className="text-sm text-gray-600">{crs.provider}</p>
                </div>
                <button
                  onClick={() => handleArrayRemove('courses', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Achievements Section
  const AchievementsTab = () => {
    const [achievement, setAchievement] = useState({ title: '', description: '', date: '' });

    const addAchievement = () => {
      if (achievement.title.trim()) {
        handleArrayAdd('achievements', achievement);
        setAchievement({ title: '', description: '', date: '' });
      }
    };

    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Achievement Title"
          value={achievement.title}
          onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <textarea
          placeholder="Description"
          value={achievement.description}
          onChange={(e) => setAchievement({ ...achievement, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows="3"
        />
        <input
          type="date"
          value={achievement.date}
          onChange={(e) => setAchievement({ ...achievement, date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={addAchievement}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Add Achievement
        </button>

        <div className="mt-6 space-y-3">
          {resumeData.achievements?.map((ach, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{ach.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{ach.description}</p>
                </div>
                <button
                  onClick={() => handleArrayRemove('achievements', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'skills', label: 'Skills', component: <SkillsTab /> },
    { id: 'projects', label: 'Projects', component: <ProjectsTab /> },
    { id: 'courses', label: 'Courses', component: <CoursesTab /> },
    { id: 'achievements', label: 'Achievements', component: <AchievementsTab /> },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-600'
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

export default ResumeForm;
