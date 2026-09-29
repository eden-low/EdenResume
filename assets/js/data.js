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
    positioning: { en: 'I work across web development, system design, and technical operations.', zh: '专注于网页开发、系统设计与技术运营。' },
    summary: {
      en: 'Business Information Systems undergraduate with hands-on experience in system design, data security, web development, and technical operations. I have worked with HTML, CSS, JavaScript, Python, and SQL, and gained leadership experience through campus event organisation.',
      zh: '商业信息系统本科生，具备系统设计、数据安全、网页开发与技术运营方面的实践经验。曾使用 HTML、CSS、JavaScript、Python 与 SQL，并通过校园活动策划与组织累积领导经验。'
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
      id: 'edenatlas', slug: 'edenatlas', name: 'EdenAtlas', category: { en: 'Personal Platform', zh: '个人平台' }, role: { en: 'Independent Designer & Developer', zh: '独立设计与开发' },
      source: 'legacy', visibility: 'historical', status: 'archived', statusLabel: { en: 'Discontinued · archived case study', zh: '已停止维护 · 历史案例' }, githubUrl: null, liveUrl: null,
      includeInPortfolio: false, includeInResume: false, includeInCV: false, resumePriority: null, cvPriority: null,
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
      id: 'utar-epms', slug: 'utar-epms', name: 'UTAR Event Planning Management System', category: { en: 'Coursework', zh: '课程项目' }, role: { en: 'Requirements analysis, system and database design, and core module implementation', zh: '参与需求分析、系统与数据库设计及核心模块实现' },
      source: 'manual', visibility: 'public', status: 'active', statusLabel: { en: 'Coursework', zh: '课程项目' }, githubUrl: null, liveUrl: null,
      includeInPortfolio: true, includeInResume: true, includeInCV: true, resumePriority: 2, cvPriority: 2,
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
      id: 'enterprise-ai-ops', slug: 'enterprise-ai-ops', name: 'Enterprise AI Platform & Operations Improvements', category: { en: 'Internship', zh: '实习项目' }, role: { en: 'Technical and operations improvements', zh: '技术与运营改进' },
      source: 'company', visibility: 'public-summary', status: 'active', statusLabel: { en: 'Internship work', zh: '实习工作' }, githubUrl: null, liveUrl: null,
      includeInPortfolio: true, includeInResume: true, includeInCV: true, resumePriority: 1, cvPriority: 1,
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
  CV: {
    summary: {
      en: 'Business Information Systems undergraduate at UTAR with practical experience in system design, data security, web programming, and software development. Worked with HTML, CSS, JavaScript, Python, and SQL; supported technical and operational work at an AI technology company; and led a university event involving approximately 300 freshmen.',
      zh: '拉曼大学商业信息系统本科生，具备系统设计、数据安全、网页编程与软件开发的实践经验。曾使用 HTML、CSS、JavaScript、Python 与 SQL，在 AI technology company 参与技术与运营工作，并领导涉及约 300 名新生的大学活动。'
    },
    projectHighlights: {
      edenatlas: {
        en: [
          'Independently designed a private platform bringing memories, diaries, career information, and daily records together.',
          'Used authentication and access controls to manage access to personal content.'
        ],
        zh: [
          '独立设计私人平台，集中管理回忆、日记、职业信息及日常记录。',
          '使用身份验证与权限控制管理个人内容的访问。'
        ]
      },
      'utar-epms': {
        en: [
          'Structured event proposal, approval, and planning workflows.'
        ],
        zh: [
          '将活动提案、审批与策划工作流程结构化。'
        ]
      },
      'enterprise-ai-ops': {
        en: [
          'Improved review discussions, configurable classification, filtering, and reporting workflows.',
          'Supported incremental CSV synchronisation and AutoML and Talkbot workflow improvements.'
        ],
        zh: [
          '改善审核讨论、可配置分类、筛选与报表工作流程。',
          '协助增量 CSV 同步及 AutoML 与 Talkbot 工作流程改进。'
        ]
      }
    }
  },
  RESUME: {
    summary: {
      en: 'Business Information Systems undergraduate with hands-on experience in web development, system design, data security, and technical operations. Worked with web, database, and testing technologies while supporting enterprise AI platform workflows and campus event leadership.',
      zh: '商业信息系统本科生，具备网页开发、系统设计、数据安全与技术运营的实践经验。曾使用网页、数据库及测试技术，参与企业 AI 平台工作流程及校园活动领导工作。'
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
