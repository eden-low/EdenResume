/* The only source for public resume facts. Set showPhone to false to hide the number everywhere. */
window.RESUME_DATA = {
  PROFILE: {
    name: 'Low Fang Jun', displayName: 'Eden', initials: 'LFJ',
    title: { en: 'Business Information Systems Undergraduate · Web Developer', zh: '商业信息系统本科生 · 网页开发者' },
    location: { en: 'Kuching, Sarawak, Malaysia', zh: '马来西亚·砂拉越·古晋' },
    email: 'jjun8647@gmail.com', github: 'https://github.com/eden-low',
    phone: '011-10574969', showPhone: true,
    availability: { en: 'Open to opportunities', zh: '开放求职机会' },
    opportunity: { en: 'Open to internship and graduate opportunities.', zh: '开放实习与毕业生职位机会。' },
    summary: {
      en: 'Business Information Systems undergraduate with interests and hands-on experience in system design, data security, and web development. Independently developed EdenAtlas as a personal platform and worked with HTML, CSS, JavaScript, Python, and SQL. Also gained leadership experience through campus event organisation.',
      zh: '商业信息系统本科生，具备系统设计、数据安全与网页开发方面的学习和实践经验。独立开发 EdenAtlas 个人平台，并使用 HTML、CSS、JavaScript、Python 与 SQL。也通过校园活动策划与组织累积领导经验。'
    }
  },
  EDUCATION: [
    { degree: { en: 'Bachelor of Information Systems (Honours), Business Information Systems', zh: '信息系统（荣誉）学士·商业信息系统' }, school: { en: 'Universiti Tunku Abdul Rahman (UTAR)', zh: '拉曼大学（UTAR）' }, period: '2023–2026', cgpa: '2.86', coursework: { en: ['System Design', 'Data Security', 'Web Programming'], zh: ['系统设计', '数据安全', '网页编程'] } },
    { degree: { en: 'Diploma in Software Engineering', zh: '软件工程文凭' }, school: { en: 'International College of Advanced Technology Sarawak (iCATS)', zh: '砂拉越先进科技学院（iCATS）' }, period: '2020–2023', cgpa: '3.22' }
  ],
  EXPERIENCE: [{
    role: { en: 'Technical & Operations Intern', zh: '技术与运营实习生' },
    company: { en: 'AI technology company', zh: 'AI technology company' },
    location: { en: 'Malaysia', zh: '马来西亚' }, period: { en: 'Jun 2026 – Present', zh: '2026 年 6 月至今' },
    bullets: {
      en: [
        'Improved production eKYC review workflows, including review discussions, configurable fraud analysis, and data export capabilities.',
        'Standardised classification workflows, supported database migration and historical record repair, and validated consistency from APIs to dashboards.',
        'Improved large CSV synchronisation through file-status tracking, incremental processing, and database indexing optimisation.',
        'Developed and troubleshot AutoML and Talkbot functionality in an environment using Django REST Framework, Vue.js, PostgreSQL, Redis/Celery, and MinIO.',
        'Built Playwright staging end-to-end test coverage for authentication, dataset upload, training, deployment, and inference, while supporting data annotation and quality control for document tampering, recapture, and face-verification datasets.'
      ],
      zh: [
        '改善生产环境的 eKYC 审核流程，包括审核讨论、可配置的欺诈分析及数据导出功能。',
        '统一分类工作流程，协助数据库迁移与历史记录修复，并验证从 API 到仪表板的数据一致性。',
        '通过文件状态追踪、增量处理和数据库索引优化，改善大型 CSV 同步流程。',
        '在使用 Django REST Framework、Vue.js、PostgreSQL、Redis/Celery 与 MinIO 的环境中开发和排查 AutoML 与 Talkbot 功能。',
        '使用 Playwright 为测试环境的身份验证、数据集上传、训练、部署和推理建立端到端测试，并协助文件篡改、翻拍及人脸验证数据集的标注与品质控制。'
      ]
    }
  }],
  PROJECTS: [
    {
      slug: 'edenatlas', name: 'EdenAtlas', category: { en: 'Personal Platform', zh: '个人平台' }, role: { en: 'Independent Designer & Developer', zh: '独立设计与开发' },
      short: { en: 'A private personal platform bringing memories, journals, career, and everyday information together with access controls.', zh: '将回忆、日记、职业与日常信息集中管理，并设有权限控制的私人个人平台。' },
      overview: { en: 'Independently designed and developed EdenAtlas as a personal platform for different parts of everyday life.', zh: '独立设计与开发 EdenAtlas，将不同的日常生活内容整合在一个个人平台。' },
      problem: { en: 'Memories, journals, career information, and everyday records needed a shared place with private access.', zh: '回忆、日记、职业信息和日常记录需要一个集中且有私人访问控制的空间。' },
      investigation: { en: 'Explored how to organise distinct kinds of personal content and control who could access them.', zh: '研究如何组织不同类型的个人内容，并控制其访问范围。' },
      solution: { en: 'Built a web platform with authentication and access controls, using HTML, CSS, JavaScript, a PWA, Netlify Functions, and Firebase services.', zh: '使用 HTML、CSS、JavaScript、PWA、Netlify Functions 与 Firebase 服务，构建具有身份验证和权限控制的网页平台。' },
      result: { en: 'Brought these personal areas together in one private platform.', zh: '将这些个人内容整合到同一个私人平台。' },
      learned: { en: 'Strengthened practical understanding of web development, content structure, and access control.', zh: '加深对网页开发、内容结构与权限控制的实践理解。' },
      technologies: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Netlify Functions', 'Firebase Auth', 'Firestore', 'Firebase Storage']
    },
    {
      slug: 'utar-epms', name: 'UTAR Event Planning Management System', category: { en: 'Coursework', zh: '课程项目' }, role: { en: 'Requirements analysis, system and database design, and core module implementation', zh: '参与需求分析、系统与数据库设计及核心模块实现' },
      short: { en: 'Structured the event proposal, approval, and planning process.', zh: '将活动提案、审批与策划流程结构化。' },
      overview: { en: 'A coursework system for managing event planning processes at UTAR.', zh: '用于管理拉曼大学活动策划流程的课程项目。' },
      problem: { en: 'Event proposals, approvals, and planning steps needed a clearer structure.', zh: '活动提案、审批和策划步骤需要更清晰的结构。' },
      investigation: { en: 'Participated in requirements analysis and considered the system and database structure for the process.', zh: '参与需求分析，并研究该流程所需的系统与数据库结构。' },
      solution: { en: 'Contributed to system and database design and implementation of core modules.', zh: '参与系统与数据库设计及核心模块实现。' },
      result: { en: 'Structured the event proposal, approval, and planning workflow.', zh: '将活动提案、审批和策划工作流程结构化。' },
      learned: { en: 'Applied requirements analysis and database design to a defined web workflow.', zh: '将需求分析和数据库设计应用于明确的网页工作流程。' },
      technologies: ['System Analysis', 'Database Design', 'Web']
    },
    {
      slug: 'enterprise-ai-ops', name: 'Enterprise AI Platform & Operations Improvements', category: { en: 'Internship', zh: '实习项目' }, role: { en: 'Technical and operations improvements', zh: '技术与运营改进' },
      short: { en: 'Improved review, data synchronisation, classification, reporting, and AI workflows in an enterprise platform.', zh: '改善企业平台中的审核、数据同步、分类、报表与 AI 工作流程。' },
      overview: { en: 'Internship work across enterprise AI platform functions and operational workflows. The employer and internal details remain anonymous.', zh: '实习期间参与企业 AI 平台功能及运营流程改进；雇主与内部细节保持匿名。' },
      problem: { en: 'Review, classification, large-file synchronisation, and AI workflows needed more consistent handling and validation.', zh: '审核、分类、大型文件同步及 AI 工作流程需要更一致的处理与验证。' },
      investigation: { en: 'Checked workflow behaviour and consistency across APIs, database records, dashboards, and staging tests.', zh: '检查 API、数据库记录、仪表板及测试环境中的流程行为与一致性。' },
      solution: { en: 'Supported review and classification improvements, database migration and record repair, incremental CSV processing, and AutoML/Talkbot troubleshooting. Added Playwright staging coverage.', zh: '协助改善审核与分类流程、数据库迁移与记录修复、CSV 增量处理，以及 AutoML/Talkbot 问题排查，并加入 Playwright 测试环境覆盖。' },
      result: { en: 'Improved workflow consistency and large CSV synchronisation, with staging end-to-end coverage for key platform journeys.', zh: '改善流程一致性与大型 CSV 同步，并为关键平台流程建立测试环境的端到端测试覆盖。' },
      learned: { en: 'Gained experience tracing issues across application, data, and test layers in an enterprise environment.', zh: '累积在企业环境中跨应用、数据与测试层追查问题的经验。' },
      technologies: ['TypeScript', 'Django REST Framework', 'Vue 3', 'PostgreSQL', 'Redis', 'Celery', 'MinIO', 'Playwright']
    }
  ],
  LEADERSHIP: [
    { role: { en: 'Chairperson', zh: '主席' }, event: { en: 'UTAR Orientation Telematch (IBT 2026)', zh: '拉曼大学迎新团康活动（IBT 2026）' }, period: { en: 'Mar 2026', zh: '2026 年 3 月' }, detail: { en: 'Led a 41–42 person committee for an event involving approximately 300 freshmen and around 500 participants including committee members and staff.', zh: '领导 41–42 人委员会；活动涉及约 300 名新生，连同委员及工作人员约 500 名参与者。' } },
    { role: { en: 'Chairperson', zh: '主席' }, event: { en: 'Buddhist Society Welcoming Night', zh: '佛学会迎新晚会' }, period: { en: 'Oct 2024', zh: '2024 年 10 月' } },
    { role: { en: 'Program Leader', zh: '节目负责人' }, event: 'ISC 2025', period: '2025' },
    { role: { en: 'Technical Head', zh: '技术负责人' }, event: 'Sport Glory Color Run' },
    { role: { en: 'HR & Sponsor Committee', zh: '人事与赞助组委员' }, event: 'IBT', period: { en: 'Feb 2025', zh: '2025 年 2 月' } },
    { role: { en: 'HR Committee', zh: '人事组委员' }, event: 'Warrior 3.0' }
  ],
  SKILLS: {
    programming: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
    platforms: ['Firebase Auth', 'Firestore', 'Firebase Storage', 'GitHub Pages', 'Vue.js', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Celery', 'MinIO'],
    tools: ['Git', 'GitHub', 'VS Code', 'Docker', 'Playwright', 'API Testing', 'Database Migration', 'E2E Testing'],
    soft: { en: ['Leadership', 'Communication', 'Documentation', 'Coordination'], zh: ['领导力', '沟通', '文档撰写', '协调'] }
  },
  LANGUAGES: { en: ['English', 'Mandarin', 'Malay'], zh: ['英语', '华语', '马来语'] },
  RESUME: {
    summary: {
      en: 'Business Information Systems undergraduate with hands-on experience in web development, system design, data security, and technical operations. Independently developed EdenAtlas and worked with modern web, database, and testing technologies. Experienced in supporting enterprise AI platform workflows and campus event leadership.',
      zh: '商业信息系统本科生，具备网页开发、系统设计、数据安全与技术运营的实践经验。独立开发 EdenAtlas，并使用网页、数据库及测试技术。曾参与企业 AI 平台工作流程及校园活动领导工作。'
    },
    experienceBullets: {
      en: [
        'Improved production eKYC review workflows, including review discussions, configurable fraud analysis, and data export.',
        'Standardised classification workflows, supported database migration and historical record repair, and validated API-to-dashboard consistency.',
        'Improved large CSV synchronisation through file-status tracking, incremental processing, and database indexing optimisation.',
        'Developed and troubleshot AutoML and Talkbot functionality using Django REST Framework, Vue.js, PostgreSQL, Redis/Celery, and MinIO.',
        'Built Playwright staging E2E coverage for authentication, dataset upload, training, deployment, and inference, while supporting data annotation and quality control.'
      ],
      zh: [
        '改善生产环境的 eKYC 审核流程，包括审核讨论、可配置的欺诈分析及数据导出。',
        '统一分类工作流程，协助数据库迁移与历史记录修复，并验证 API 至仪表板的数据一致性。',
        '通过文件状态追踪、增量处理和数据库索引优化，改善大型 CSV 同步。',
        '使用 Django REST Framework、Vue.js、PostgreSQL、Redis/Celery 与 MinIO 开发及排查 AutoML 和 Talkbot 功能。',
        '使用 Playwright 为测试环境的身份验证、数据集上传、训练、部署与推理建立端到端测试，并协助数据标注及品质控制。'
      ]
    },
    projectTechnologies: {
      edenatlas: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Firebase'],
      'utar-epms': ['System Analysis', 'Database Design', 'Web'],
      'enterprise-ai-ops': ['TypeScript', 'Django REST', 'Vue 3', 'PostgreSQL', 'Redis', 'Celery', 'Playwright']
    },
    skills: {
      programming: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
      platforms: ['Vue.js', 'Django REST Framework', 'Firebase', 'PostgreSQL', 'Redis', 'Celery', 'MinIO'],
      tools: ['Git', 'GitHub', 'Docker', 'Playwright', 'API Testing', 'Database Migration', 'E2E Testing']
    }
  }
};
