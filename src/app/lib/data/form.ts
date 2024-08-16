const m = [
  {
    title: "Personal Information",
    id: "personalInformation",
    target: "everyone",
    config: {},
    questions: [
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        config: {
          isRequired: true,
        },
      },
      {
        id: "lastName",
        label: "Last Name",
        type: "text",
        config: {
          isRequired: true,
        },
      },
      {
        id: "preferredName",
        label: "Preferred Name",
        type: "text",
        config: {
          isRequired: false,
        },
      },
      {
        id: "pronouns",
        label: "Pronouns",
        type: "select",
        config: {
          isRequired: true,
          multiple: true,
        },
        options: [
          {
            label: "She/Her",
            value: "she",
          },
          {
            label: "He/Him",
            value: "he",
          },
          {
            label: "They/Them",
            value: "they",
          },
          {
            label: "Other",
            value: "other",
          },
        ],
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        config: {
          isRequired: true,
        },
      },
    ],
  },
  {
    title: "About You",
    id: "aboutYou",
    target: "everyone",
    config: {},
    questions: [
      {
        id: "faculty",
        label: "Faculty",
        type: "select",
        config: {
          isRequired: true,
        },
        options: [
          {
            label: "Arts",
            value: "arts",
          },
          {
            label: "Science",
            value: "science",
          },
          {
            label: "Engineering",
            value: "engineering",
          },
          {
            label: "Education",
            value: "education",
          },
          {
            label: "Music",
            value: "music",
          },
          {
            label: "Business",
            value: "business",
          },
          {
            label: "Kinesiology",
            value: "kinesiology",
          },
        ],
      },
      {
        id: "specialization",
        label: "Specialization",
        type: "select",
        config: {
          isRequired: true,
        },
        options: [
          { value: "Anthropology", label: "Anthropology" },
          { value: "Biochemistry", label: "Biochemistry" },
          { value: "Biology", label: "Biology" },
          { value: "Chemistry", label: "Chemistry" },
          { value: "Computer Science", label: "Computer Science" },
          { value: "Economics", label: "Economics" },
          { value: "English", label: "English" },
          { value: "Media Studies", label: "Media Studies" },
          {
            value: "International Relations",
            label: "International Relations",
          },
          { value: "Mathematics", label: "Mathematics" },
          { value: "Philosophy", label: "Philosophy" },
          { value: "Physics", label: "Physics" },
          { value: "Political Science", label: "Political Science" },
          { value: "Psychology", label: "Psychology" },
          { value: "Sociology", label: "Sociology" },
          { value: "Statistics", label: "Statistics" },
          { value: "Visual Arts", label: "Visual Arts" },
          { value: "Biomedical Engineering", label: "Biomedical Engineering" },
          { value: "Civil Engineering", label: "Civil Engineering" },
          { value: "Electrical Engineering", label: "Electrical Engineering" },
          { value: "Mechanical Engineering", label: "Mechanical Engineering" },
          { value: "Computer Engineering", label: "Computer Engineering" },
          { value: "Not listed", label: "Not listed" },
        ],
      },
      {
        type: "select",
        label: "Year of Study",
        id: "year",
        placeholder: "Select",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
          { value: "Other", label: "Other" },
          { value: "Graduate Student", label: "Graduate Student" },
        ],
        config: {
          isRequired: true,
        },
      },
      {
        id: "graduationYear",
        label: "Graduation Year",
        type: "number",
        config: {
          isRequired: true,
        },
      },
      {
        type: "select",
        label:
          "Which role are you applying for? - only the option you select will be considered",
        id: "role",
        placeholder: "Select",
        config: {
          isRequired: true,
        },
        options: [
          { value: "Developer", label: "Developer" },
          { value: "Designer", label: "Designer" },
        ],
      },
      {
        id: "website",
        label: "Website/Portfolio",
        type: "url",
        config: {
          isRequired: false,
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        type: "url",
        config: {
          isRequired: false,
        },
      },
      {
        id: "github",
        label: "GitHub",
        type: "url",
        config: {
          isRequired: false,
        },
      },
    ],
  },
  {
    title: "Developer Questions",
    id: "developerQuestions",
    target: "developer",
    config: {},
    questions: [
      {
        type: "select",
        label:
          "What areas of development are you interested in? - select up to 3",
        id: "development-interest",
        placeholder: "Select",
        config: {
          isRequired: true,
          multiple: true,
        },
        options: [
          { value: "Frontend", label: "Frontend" },
          { value: "Backend", label: "Backend" },
          { value: "Full Stack", label: "Full Stack" },
          { value: "Mobile", label: "Mobile" },
          { value: "Cloud", label: "Cloud" },
          { value: "AI & ML", label: "AI & ML" },
          { value: "Web", label: "Web" },
          { value: "Infrastructure", label: "Infrastructure" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        type: "select",
        label: "What languages do you use the most? - select up to 3",
        id: "languages",
        placeholder: "Select",
        config: {
          isRequired: true,
          multiple: true,
        },
        options: [
          { value: "JavaScript", label: "JavaScript" },
          { value: "Python", label: "Python" },
          { value: "Java", label: "Java" },
          { value: "C++", label: "C++" },
          { value: "C#", label: "C#" },
          { value: "Ruby", label: "Ruby" },
          { value: "Swift", label: "Swift" },
          { value: "Go", label: "Go" },
          { value: "Kotlin", label: "Kotlin" },
          { value: "Rust", label: "Rust" },
          { value: "TypeScript", label: "TypeScript" },
          { value: "PHP", label: "PHP" },
          { value: "Scala", label: "Scala" },
          { value: "Lua", label: "Lua" },
          { value: "R", label: "R" },
          { value: "Objective-C", label: "Objective-C" },
          { value: "Groovy", label: "Groovy" },
          { value: "Matlab", label: "Matlab" },
          { value: "SQL", label: "SQL" },
          { value: "Dart", label: "Dart" },
          { value: "Elixir", label: "Elixir" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        type: "select",
        label: "What frameworks or tools do you use the most? - select up to 3",
        id: "frameworks",
        placeholder: "Select",
        config: {
          isRequired: true,
          multiple: true,
        },
        options: [
          { value: "React", label: "React" },
          { value: "Angular", label: "Angular" },
          { value: "Vue", label: "Vue" },
          { value: "Django", label: "Django" },
          { value: "Flask", label: "Flask" },
          { value: "Spring", label: "Spring" },
          { value: "Express.js", label: "Express.js" },
          { value: "Ruby on Rails", label: "Ruby on Rails" },
          { value: "ASP.NET", label: "ASP.NET" },
          { value: "Laravel", label: "Laravel" },
          { value: "Svelte", label: "Svelte" },
          { value: "TensorFlow", label: "TensorFlow" },
          { value: "PyTorch", label: "PyTorch" },
          { value: "Keras", label: "Keras" },
          { value: "Pandas", label: "Pandas" },
          { value: "NumPy", label: "NumPy" },
          { value: "Unity", label: "Unity" },
          { value: "Unreal Engine", label: "Unreal Engine" },
          { value: "AWS", label: "AWS" },
          { value: "Google Cloud", label: "Google Cloud" },
          { value: "Azure", label: "Azure" },
          { value: "Docker", label: "Docker" },
          { value: "Kubernetes", label: "Kubernetes" },
          { value: "Jenkins", label: "Jenkins" },
          { value: "CircleCI", label: "CircleCI" },
          { value: "JUnit", label: "JUnit" },
          { value: "Mocha", label: "Mocha" },
          { value: "Jest", label: "Jest" },
          { value: "Selenium", label: "Selenium" },
          { value: "Postman", label: "Postman" },
          { value: "Cypress", label: "Cypress" },
          { value: "Puppeteer", label: "Puppeteer" },
          { value: "PyTest", label: "PyTest" },
          { value: "RSpec", label: "RSpec" },
          { value: "Other", label: "Other" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        type: "textarea",
        label:
          "Describe a recent concept or software tool that you have learned",
        id: "development-learning",
        placeholder: "Last month, I started learning...",
        config: {
          isRequired: true,
        },
      },
      {
        type: "textarea",
        label: "What do you want to do most in the coming year?",
        id: "development-aspirations",
        placeholder: "This year, I want to...",
        config: {
          isRequired: true,
        },
      },
    ],
  },
  {
    title: "Designer Questions",
    id: "designerQuestions",
    target: "designer",
    config: {},
    questions: [
      {
        type: "select",
        label: "What areas of design are you interested in?",
        id: "design-interest",
        placeholder: "Select",
        config: {
          isRequired: true,
          multiple: true,
        },
        options: [
          { value: "UI/UX", label: "UI/UX" },
          { value: "Graphic Design", label: "Graphic Design" },
          { value: "Web Design", label: "Web Design" },
        ],
      },
      {
        type: "select",
        label: "What tools do you use?",
        id: "design-tools",
        placeholder: "Select",
        config: {
          isRequired: true,
          multiple: true,
        },
        options: [
          { value: "Figma", label: "Figma" },
          { value: "Adobe Creative Suite", label: "Adobe Creative Suite" },
          { value: "Sketch", label: "Sketch" },
          { value: "InVision", label: "InVision" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        type: "textarea",
        label: "Tell us about your design experience",
        id: "design-experience",
        placeholder: "I have experience in...",
        config: {
          isRequired: true,
        },
      },
    ],
  },
];

export const form = m;
