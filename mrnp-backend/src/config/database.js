const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const Job = require('../models/Job');
const Service = require('../models/Service');
const About = require('../models/About');

const defaultServices = [
  {
    slug: "audit-and-assurance",
    title: "Audit & Assurance Services",
    description: "In today's dynamic business landscape, transparency and financial credibility are paramount. That's where audit & assurance services come in. We, at MRNP & CO LLP, offer a comprehensive suite of services designed to instil trust in your financial statements and empower you to make informed decisions.",
    image: "/images/services/audit-and-assurance.png",
    pageTitle: "What is an Audit & Assurance Service?",
    intro: "An audit & assurance service provides an independent assessment of your organization's financial statements. Our qualified Chartered Accountants (CAs) meticulously examine your records to ensure they accurately reflect your financial position and performance. This independent verification builds trust with stakeholders, including investors, creditors, lenders, and regulators.",
    sections: [
      {
        heading: "Benefits of Audit & Assurance Services",
        body: [
          "Enhanced Credibility: Independent verification of your financial statements by a reputable CA firm strengthens your credibility and builds trust with stakeholders.",
          "Risk Mitigation: Our in-depth review helps identify and address potential financial reporting errors or internal control weaknesses.",
          "Improved Decision Making: Gain valuable insights through our analysis, enabling you to make informed financial decisions with greater confidence.",
          "Compliance Support: We ensure your financial reporting adheres to relevant accounting standards and regulations."
        ]
      }
    ],
    whyTitle: "Why Choose MRNP & CO LLP for Audit & Assurance Services?",
    whySubtitle: "We understand the unique needs of businesses and offer a personalized approach :",
    whyCards: [
      {
        title: "Experienced & Qualified Team",
        body: "Our team comprises highly skilled and experienced CAs, committed to providing exceptional service."
      },
      {
        title: "Industry Expertise",
        body: "We possess in-depth knowledge of various industries, ensuring a tailored audit approach that meets your specific needs."
      },
      {
        title: "Technology - Driven Approach",
        body: "We leverage cutting-edge technology to streamline the audit process and enhance efficiency."
      },
      {
        title: "Clear Communication",
        body: "We believe in clear and transparent communication, keeping you informed throughout the entire audit engagement."
      }
    ]
  },
  {
    slug: "Business-Consultancy-and-Advisory",
    title: "Business Consultancy & Advisory",
    description: "In today's dynamic business landscape, navigating challenges and capitalizing on opportunities requires a trusted advisor by your side. MRNP & CO LLP goes beyond traditional accounting services, offering comprehensive Business Consultancy & Advisory solutions to empower your company's success.",
    image: "/images/services/Business-Consultancy-and-Advisory.png",
    pageTitle: "Leveraging Deep Expertise & Objective Insights",
    intro: "MRNP & CO LLP's team of experienced consultants brings a unique perspective to your business. Combining in-depth financial knowledge with strategic thinking, we provide valuable insights often overlooked by internal teams. Our experience as auditors for various companies allows us to identify areas for improvement and offer actionable recommendations that enhance your bottom line.",
    sections: [
      {
        heading: "Our Business Consultancy & Advisory Services",
        body: [
          "Accounting Advisory: Gain expert guidance on complex accounting issues, ensuring compliance and optimizing your financial performance.",
          "India Entry Strategy & Incubation Support: Navigate the intricacies of establishing a business in India with our comprehensive support, from market research to legal and regulatory compliance.",
          "Start-up & Business Growth Strategies: Develop a winning roadmap for your new venture or propel your existing business forward with our strategic planning and expertise.",
          "Government Incentives & Grant Assistance: Identify and leverage government schemes and grants that can significantly reduce your operational costs and fuel your growth.",
          "Operational Efficiency & Process Improvement: Streamline your internal processes and workflows to boost efficiency, reduce waste, and unlock greater profitability.",
          "Risk Management & Internal Controls: Implement robust risk management frameworks and internal controls to mitigate risks and safeguard your business assets."
        ]
      },
      {
        heading: "A Collaborative Approach to Success",
        body: "We believe in fostering a collaborative partnership with our clients. Through open communication and a deep understanding of your unique business goals, we tailor our services to address your specific needs. Our approach is designed to empower your team with the knowledge and tools needed to achieve sustainable growth."
      },
      {
        heading: "Why Choose MRNP & CO LLP for Business Consultancy & Advisory?",
        body: [
          "Holistic Expertise: We offer a comprehensive suite of business advisory services, eliminating the need for multiple advisors.",
          "Objectivity & Fresh Perspective: Our external viewpoint provides unbiased insights that internal teams may miss.",
          "Proven Track Record: Our experience with diverse industries ensures we can develop solutions tailored to your specific challenges.",
          "Client-Centric Approach: We prioritize building long-term partnerships and fostering your success."
        ]
      },
      {
        heading: "Unlocking Your Growth Potential with MRNP & CO LLP",
        body: "Contact MRNP & CO LLP today to schedule a consultation and explore how our Business Consultancy & Advisory services can empower your organization to achieve its full potential."
      }
    ]
  },
  {
    slug: "Changes-in-Accounting-Standards-and-Legislations",
    title: "Changes in Accounting Standards & Legislations",
    description: "At MRNP & CO LLP, we understand the challenges of navigating ever-evolving accounting standards and regulations. Our team of experienced professionals possesses a deep understanding of public entity accounting, auditing, and consulting. This allows us to stay proactive in keeping you informed about upcoming changes and their potential impact on your business.",
    image: "/images/services/Changes-in-Accounting-Standards-and-Legislations.png",
    pageTitle: "Why are Changes in Accounting Standards & Legislations Important?",
    intro: "Accounting standards and regulations are crucial for ensuring transparency, consistency, and reliability in financial reporting. Changes to these standards can significantly impact how companies record, measure, and report financial information. It's essential to be aware of upcoming changes to maintain compliance and accurately represent your financial health.",
    sections: [
      {
        heading: "How Can MRNP & CO LLP Help?",
        body: [
          "Staying Informed: We continuously monitor proposed changes from regulatory bodies like the Financial Accounting Standards Board (FASB) and the Securities and Exchange Commission (SEC).",
          "Proactive Communication: We translate complex changes into clear and actionable insights, keeping you apprised of upcoming legislative and regulatory shifts.",
          "Internal Requirements Assessment: We help identify the internal adjustments needed within your organization to adapt to new standards.",
          "Impact Analysis: We assess the potential impact of upcoming changes on your financial statements and overall operations."
        ]
      }
    ]
  },
  {
    slug: "Governance-and-Risk-Management",
    title: "Governance & Risk Management",
    description: "In today's dynamic business environment, ensuring strong governance and effective risk management is crucial for sustainable success. At MRNP & Co LLP, we understand the challenges you face and offer comprehensive solutions to help you navigate these complexities.",
    image: "/images/services/Governance-and-Risk-Management.png",
    pageTitle: "What is Governance & Risk Management (GRC)?",
    intro: "GRC is a holistic approach that integrates three key elements:",
    sections: [
      {
        body: [
          "Governance: The framework of rules, processes, and structures that guide an organization's decision-making and operations.",
          "Risk Management: Identifying, analyzing, and mitigating potential threats that could hinder your business objectives.",
          "Compliance: Ensuring your organization adheres to all relevant laws, regulations, and industry standards."
        ]
      },
      {
        heading: "Why is GRC Important for Your Business?",
        body: [
          "Enhanced Transparency and Accountability: Clear policies and procedures foster trust within your organization and with external stakeholders.",
          "Improved Decision-Making: By proactively identifying and managing risks, you can make well-informed decisions that drive growth.",
          "Reduced Operational Disruptions: Proactive risk mitigation helps prevent operational hiccups and ensures business continuity.",
          "Minimized Legal and Regulatory Issues: Maintaining compliance reduces the risk of hefty fines and reputational damage."
        ]
      },
      {
        heading: "MRNP & Co LLP's Approach to GRC",
        description: "At MRNP & Co LLP, we believe in a collaborative approach to GRC. We work closely with your team to:",
        body: [
          "Develop a Customized GRC Framework: We tailor our solutions to your specific industry, size, and risk profile.",
          "Implement Concurrent Investigative Audits: Our concurrent approach ensures real-time feedback on policy adherence and operational effectiveness.",
          "Provide Ongoing Support: Our dedicated team stays updated on regulatory changes and offers ongoing guidance.",
          "Offer Value-Added Services: We go beyond traditional audits, assisting with operational manual preparation, financial impact assessment, and continuous compliance updates."
        ]
      }
    ]
  },
  {
    slug: "management-recommendations",
    title: "Management Recommendations",
    description: "Empowering Informed Decisions for Optimal Performance At MRNP & Co LLP, we go beyond traditional audits. We provide comprehensive Management Recommendations, a valuable service designed to not only ensure the accuracy of your financial statements but also to empower you with actionable insights for continuous improvement.",
    image: "/images/services/management-recommendations.png",
    pageTitle: "Our Approach to Management Recommendations",
    intro: "Our meticulous audit process incorporates a thorough evaluation of your internal controls and a close examination of your accounting policies, all aligned with your specific management requirements. This in-depth analysis allows us to deliver insightful recommendations that address:",
    sections: [
      {
        body: [
          "Internal Control Optimization: We identify areas where your internal controls can be strengthened, mitigating operational risks and safeguarding your assets.",
          "Enhanced Operating Efficiencies: We unveil opportunities to streamline processes, improve efficiency, and maximize your bottom line."
        ]
      },
      {
        heading: "Beyond the Audit: Technical Expertise at Your Service",
        description: "In addition to our comprehensive audit report, we provide invaluable technical advice designed to elevate your financial reporting. Our expert team guides you in achieving:",
        body: [
          "Compelling Financial Statement Presentation: Clear and concise financial statements that effectively communicate your company's financial health to stakeholders.",
          "Informative Note Disclosures: Detailed and transparent disclosures that provide a deeper understanding of your financial position and performance."
        ]
      }
    ]
  },
  {
    slug: "Tax-Consultancy",
    title: "Tax Consultancy",
    description: "The Indian tax environment presents a complex web of regulations that are constantly evolving. At MRNP & CO LLP, we understand the challenges individuals and businesses face. Our team of highly qualified and experienced tax professionals is dedicated to empowering you with the strategies you need to maximize tax efficiency.",
    image: "/images/services/Tax-Consultancy.png",
    pageTitle: "Comprehensive Tax Services",
    intro: "The Indian tax environment presents a complex web of regulations that are constantly evolving. At MRNP & CO LLP, a premier tax consultancy firm headquartered in Vadodara, India, we understand the challenges individuals and businesses face in maximizing their tax efficiency. Our team of highly qualified and experienced tax professionals is dedicated to empowering you with the knowledge and strategies you need to make informed financial decisions.",
    sections: [
      {
        heading: "Comprehensive  Tax Services",
        body: [
          "Corporate Tax: Our team possesses a deep understanding of corporate tax regulations, ensuring your business remains compliant while minimizing its tax burden. We assist with tax planning, preparation, and filing, keeping you informed of any relevant changes.",
          "International Tax: Expanding your operations internationally introduces a new layer of tax complexity. Our team offers strategic tax planning for international businesses, navigating the intricacies of cross-border transactions, transfer pricing, and foreign tax credits. We help you navigate the nuances of international tax law to ensure your global operations are tax-efficient.",
          "Transfer Pricing: Transfer pricing involves the valuation of goods and services traded between related entities in different countries. Our specialists ensure your policies comply with international tax regulations,mitigating risks associated with non-compliance and maximizing your tax efficiency on a global scale.",
          "Expatriate Tax: Moving to a new country can be challenging, and tax compliance can be a major source of stress. We guide expatriates through the complexities of Indian tax laws, ensuring a smooth transition and proper tax compliance. We help you understand your tax obligations and ensure you are filing all necessary returns accurately and on time.",
          "Indirect Tax: Indirect taxes, such as the Goods and Services Tax (GST), can significantly impact your business operations. Our experts handle all aspects of indirect taxes, minimizing your indirect tax burden through strategic planning and ensuring accurate filing."
        ]
      },
      {
        heading: "MRNP & CO LLP's Tax Consultancy Expertise:",
        description: "Adept Professionals: Our team comprises highly qualified Chartered Accountants and tax consultants who stay abreast of the latest tax laws and regulations. We are passionate about helping our clients achieve their financial goals.",
        body: [
          "Tailored Solutions: We understand that every client has unique financial circumstances. We take the time to understand your specific needs and tailor our services to deliver the most effective solutions.",
          "Cost-Effective Approach: We offer competitive fees and work diligently to minimize your tax liability. You can be confident that you are receiving exceptional value for your investment.",
          "Client-Centric Focus: We are committed to providing exceptional client service, building long-term relationships based on trust, open communication, and a genuine desire to see you succeed."
        ]
      }
    ]
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    // Seed default "IT - Software Engineer" job if not present
    try {
      const hasSoftwareEngineer = await Job.findOne({ department: 'IT', position: 'Software Engineer' });
      if (!hasSoftwareEngineer) {
        console.log('Seeding default job: Software Engineer...');
        await Job.create({
          department: 'IT',
          position: 'Software Engineer',
          city: 'Vadodara',
          state: 'Gujarat',
          description: 'We are looking for a skilled Software Engineer to join our team. As an SDE, you will be responsible for designing, developing, and maintaining scalable software solutions. You will work closely with cross-functional teams to deliver high-quality products.',
          requirements: [
            'Design, develop, and deploy scalable applications.',
            'Write clean, maintainable, and efficient code.',
            'Collaborate with product managers and designers to implement new features.',
            'Optimize applications for performance and security.',
            'Debug and resolve software issues.'
          ]
        });
        console.log('Default job seeded successfully!');
      }
    } catch (seedErr) {
      console.error('Error seeding default job:', seedErr);
    }

    // Seed default Services if not present
    try {
      const serviceCount = await Service.countDocuments();
      if (serviceCount === 0) {
        console.log('No services found in database. Seeding default services...');
        await Service.create(defaultServices);
        console.log('Default services seeded successfully!');
      }
    } catch (seedErr) {
      console.error('Error seeding default services:', seedErr);
    }

    // Seed default About page if not present
    try {
      const aboutCount = await About.countDocuments();
      if (aboutCount === 0) {
        console.log('No About Us document found in database. Seeding default About content...');
        await About.create({
          heroTitle: 'Empowering Financial Futures.',
          heroDescription: "We see each client as unique, with their own set of goals and challenges. That's why we don't offer a one-size-fits-all solution. We're dedicated to understanding your specific needs and working tirelessly to deliver the best possible results.",
          commitmentImage: '/images/about-group.png',
          commitmentTitle: 'An everlasting commitment to fiduciary values',
          commitmentParagraphs: [
            "Established in 2011, MRNP & CO LLP is a distinguished Chartered Accountant firm with a robust presence across multiple states including Bengaluru, Ahmedabad, Raipur, Surat, Vadodara, Gandhidham, and Bhuj. Founded by a cadre of young, dynamic professionals with extensive backgrounds in top consulting firms, our firm specializes in delivering customized solutions to meet the diverse needs of our clients.",
            "At MRNP & CO LLP, we are committed to providing high-quality, timely services tailored to industry-specific requirements. Our team comprises talented professionals who leverage their expertise to deliver technology-enabled solutions that ensure client success. We prioritize a collaborative approach, fostering synergy across our service areas to offer comprehensive solutions even in the most complex scenarios."
          ],
          values: [
            {
              title: "Putting Clients First:",
              description: "For us, it's all about you. We listen carefully to understand your challenges and goals, so we can tailor solutions that truly make a difference to your business. Your success is our priority, and we're committed to going above and beyond to deliver results you can rely on.",
              icon: "/about/vector2.svg"
            },
            {
              title: "Delivering Excellence:",
              description: "Quality is at the heart of everything we do. We hold ourselves to the highest standards, ensuring that every piece of advice and every service we provide meets your expectations and ours. It's about accuracy, reliability, and exceeding your expectations.",
              icon: "/about/vector3.svg"
            },
            {
              title: "On Time, Every Time:",
              description: "We get it—deadlines matter. You can count on us to deliver when we say we will. Consistency in meeting deadlines is part of our promise to you, so you can plan with confidence knowing we've got your back.",
              icon: "/about/vector4.svg"
            },
            {
              title: "Building Trusting Relationships:",
              description: "Trust is earned through transparency, respect, and reliability. We believe in building strong, lasting partnerships with our clients. By understanding your business inside out, we can anticipate your needs and grow together through thick and thin.",
              icon: "/about/vector5.svg"
            },
            {
              title: "Integrity and Teamwork:",
              description: "We operate with integrity in everything we do. Honesty, transparency, and ethical behavior are non-negotiable. We value teamwork and collaboration, pooling our expertise to find innovative solutions that solve your toughest challenges.",
              icon: "/about/vector6.svg"
            },
            {
              title: "Passion and Leadership:",
              description: "Quality is at the heart of everything we do. We hold ourselves to the highest standards, ensuring that every piece of advice and every service we provide meets your expectations and ours. It's about accuracy, reliability, and exceeding your expectations.",
              icon: "/about/vector1.svg"
            }
          ],
          partners: [
            {
              name: "Mahesh Limbani",
              role: "CA . Mahesh Limbani",
              degree: "(FCA, B.Com) : Gandhidham",
              image: "/images/partners/12_8192b51029.png",
              email: "mahesh@mrnp.in",
              bio: "With over a decade of distinguished standing in the accounting profession, Mahesh Limbani is a Fellow Member of the Institute of Chartered Accountants of India (ICAI). He has built a reputation as a strategic financial advisor, specializing in a comprehensive suite of financial services designed to drive corporate growth and stability. His core expertise lies in corporate financial planning, where he assists organizations in navigating the complexities of both short-term and long-term borrowing. By focusing on robust project finance strategies and efficient working capital management, Mahesh Limbani ensures that businesses maintain the liquidity and capital structure necessary to thrive in competitive markets. Beyond his work in financial strategy, Mahesh Limbani brings a wealth of experience to the critical fields of Direct and Indirect Taxation, assurance, and professional accounting. He is particularly recognized for his deep technical expertise in Service Tax, providing high-level advisory, planning, and compliance services. His practice serves a diverse portfolio of clients, ranging from emerging SMEs to large-scale corporate entities. By bridging the gap between complex regulatory requirements and practical business goals, Mahesh Limbani delivers tailored solutions that ensure fiscal compliance while maximizing long-term financial health."
            },
            {
              name: "Mukeshkumar Senghani",
              role: "CA . Mukeshkumar Senghani",
              degree: "(FCA, B.com) : Gandhidham",
              image: "/images/partners/04_d90dae2878.png",
              email: "mukesh@mrnp.in",
              bio: "As a Fellow Member of the Institute of Chartered Accountants of India, Mukesh Senghani has spent over six years building a specialized practice centered on the complexities of state and central indirect taxation. His professional foundation was built on mastering State VAT and Professional Tax, where he became a trusted advisor for businesses navigating the specific requirements of Gujarat Value Added Tax (GVAT). Mukesh is particularly well-versed in the nuances of Works Contracts, providing SMEs and corporate clients with the detailed audit and compliance support necessary to manage state-level tax obligations without disruption. With the shift to India’s current tax regime, Mukesh transitioned his deep knowledge of indirect taxes to become a specialist in the Goods and Services Tax (GST). He now focuses on guiding businesses through the entire GST lifecycle, from high-level planning and advisory to day-to-day compliance and filing. By staying ahead of evolving regulations, he helps his clients bridge the gap between their legacy tax practices and modern requirements. Whether he is working with a growing startup or an established corporation, Mukesh’s approach is defined by a commitment to precision and a practical understanding of how tax strategy impacts a company's overall financial health."
            },
            {
              name: "Ritesh Rangani",
              role: "CA . Ritesh Rangani",
              degree: "(FCA, B.Com, ISA) : Bangalore",
              image: "/images/partners/02_1e066f3d16.png",
              email: "ritesh@mrnp.in",
              bio: "Based in Bangalore, CA Ritesh Rangani is a Fellow Member of the Institute of Chartered Accountants of India (ICAI) with over nine years of deep-rooted expertise in the financial sector. His professional journey is characterized by a high degree of proficiency in Statutory, Tax, and Internal Audits, alongside a dedicated focus on management consultancy. As an Information Systems Auditor (ISA), Ritesh brings a tech-forward perspective to his work, ensuring that traditional accounting practices meet modern digital standards through specialized services like System Audits, KYC Audits, and Compliance reviews. Ritesh’s impact extends significantly into the realm of corporate finance and business expansion. He has become a key resource for clients seeking government assistance for new projects, modernizations, or facility expansions. His extensive knowledge of the Industries Commissionerate and various financial institutions allows him to bridge the gap between business needs and capital requirements—whether that involves securing Term Loans, Mortgage Loans, or managing Cash-Credit and Overdraft facilities. Beyond consultancy, Ritesh is highly regarded for his technical command over the banking sector’s audit requirements. He has successfully led a diverse range of bank-related assignments, including Concurrent, Revenue, and Stock-receivable Audits. By maintaining strong professional ties with executives across the banking and financial landscape, he provides his clients in Bangalore and beyond with a distinct advantage. His approach combines the rigor of Payroll and Compliance Audits with a strategic mindset, helping businesses remain compliant while optimizing their financial health."
            },
            {
              name: "Nemish Patel",
              role: "CA. Nemish Patel",
              degree: "(FCA, LLB, B.Com) : Vadodara",
              image: "/images/partners/01_7decc3f311.png",
              email: "nemish@mrnp.in",
              bio: "Based in Vadodara, CA Nemish Patel offers a unique blend of financial and legal expertise as a Fellow Member of the Institute of Chartered Accountants of India and a graduate of Law (LLB). With a professional career spanning over eight years, he has carved out a niche in providing sophisticated advisory services that bridge the gap between complex Indian regulations and global business needs. Nemish is particularly recognized for his work with Non-Resident Indians (NRIs) and foreign corporations, where he facilitates seamless Foreign Direct Investment (FDI) and provides strategic guidance on international financial services, project finance, and effective working capital management. His dual background in accounting and law makes him a formidable representative in Income Tax assessment and tribunal matters. He goes beyond standard tax planning to offer high-level litigation support and liasioning, ensuring that his clients' interests are protected at every level of the tax hierarchy. This legal perspective adds a layer of depth to his management consultancy, specifically when navigating the intricacies of insurance claim matters or designing robust internal control systems tailored to the specific risk profiles of Indian and international corporate. Beyond traditional auditing, Nemish is a vital partner for businesses undergoing digital transformation. He has extensive experience in \"bridging services,\" acting as the critical link between management and technical teams to ensure the successful implementation of SAP and other ERP systems. By combining accounting assurance with a deep understanding of business processes, he helps organizations modernize their infrastructure while maintaining strict financial integrity. Whether advising a startup on its first borrowing structure or representing a large corporate entity in a tax dispute, his approach remains focused on clarity, compliance, and long-term fiscal health."
            },
            {
              name: "Paresh Patel",
              role: "CA. Paresh Patel",
              degree: "(FCA, M.Com) : Vadodara",
              image: "/images/partners/10_3e0706321c.png",
              email: "paresh@mrnp.in",
              bio: "With a professional career spanning over 11 years, Paresh Patel has established himself as a versatile Fellow Member of the Institute of Chartered Accountants of India. His expertise is rooted in a deep understanding of the Indian tax landscape, having successfully guided clients through the transition from legacy systems like State VAT into the modern eras of GST and RERA. Today, he is a key advisor for both corporate and non-corporate entities, specializing in the complexities of GST compliance and litigation. His proactive approach to income tax matters and his ability to represent clients in litigation reflect a professional who is as comfortable in a courtroom setting as he is with a balance sheet. Beyond his taxation practice, Paresh has built a significant reputation within the banking and financial sectors. Holding a specialized Certificate in Concurrent Audit of Banks, he has led extensive statutory, internal, and revenue audits for various bank branches. This technical proficiency is complemented by his work in management advisory and project finance, where he helps businesses secure subsidies and optimize their investment strategies. Academically grounded with both a B.Com and M.Com to support his FCA status, Paresh is recognized by his clients for an ethical, solution-oriented approach. He remains dedicated to providing clear-cut financial leadership, ensuring that every client—regardless of their size—benefits from transparent and high-integrity consultancy."
            },
            {
              name: "Hiren Divani",
              role: "CA . Hiren Divani",
              degree: "(FCA, B.Com, FAFD) : Surat",
              image: "/images/partners/07_34178313aa.png",
              email: "hiren@mrnp.in",
              bio: "Since entering the profession in 2015, Hiren Divani has built a practice in Surat that stands out for its analytical depth and technical precision. While many focus solely on standard compliance, Hiren has developed a specialized edge through his certification in Forensic Accounting and Fraud Detection (FAFD). This allow him to offer an investigative perspective that is increasingly vital for modern businesses, ensuring that Income Tax audits, stock audits, and bank audits are handled with a level of scrutiny that goes beyond the surface. His approach isn't just about finding errors; it’s about providing business owners with the peace of mind that their financial systems are secure and transparent. His work also reflects the changing landscape of the Indian economy, particularly through his consultancy in the renewable energy sector. Hiren bridges the gap between traditional accounting and forward-thinking financial strategy, assisting clients with Portfolio Management Services (PMS) and Project Finance. By combining his academic background as an FCA and B.Com graduate with a sharp eye for market opportunities, he helps organizations align their tax planning with long-term growth. Whether he is navigating a complex bank audit or advising on a new green energy venture, Hiren is known for delivering practical, high-integrity solutions that help businesses thrive in a regulated environment."
            },
            {
              name: "Nikul Ramani",
              role: "CA . Nikul Ramani",
              degree: "(FCA, B.Com) : Surat",
              image: "/images/partners/08_02dd9a3bf3.png",
              email: "nikul@mrnp.in",
              bio: "Nikul Ramani joined the profession with a deep focus on the evolving landscape of Indian taxation, bringing over six years of intensive experience to his role as an Associate Member of the ICAI. He is perhaps best known for his pivotal work during the nationwide shift to the Goods and Services Tax (GST). As a pioneer in this space, Nikul was instrumental in helping businesses navigate the initial chaos of the transition, ensuring that his clients' systems were not only compliant but optimized for the new tax regime. Today, he continues to serve as a vital consultant, providing the high-level advisory and strategy needed to manage complex GST frameworks for a diverse portfolio of clients. Beyond his expertise in indirect tax, Nikul acts as a primary advisor for Income Tax and TDS matters, bridging the gap between day-to-day compliance and long-term fiscal health. His practice is built on the belief that tax planning should be integrated with overall financial management. By leveraging his rich background in financial planning, he helps businesses structure their operations to maintain liquidity while minimizing tax liabilities. Whether he is solving a complicated TDS issue or drafting a comprehensive financial plan, Nikul is recognized for his hands-on approach and his ability to provide clear, decisive guidance in a rapidly changing regulatory environment."
            },
            {
              name: "Arvind Keshrani",
              role: "CA . Arvind Keshrani",
              degree: "(FCA, B.Com) : Raipur",
              image: "/images/partners/09_72714292ac.png",
              email: "arvind@mrnp.in",
              bio: "For over a decade, Arvind Keshrani has served as a cornerstone for businesses operating within India’s most demanding industrial sectors. Since becoming a Fellow Member of the ICAI in 2013, he has managed the complex financial oversight required for listed companies, large-scale cement plants, and mega power projects. His career is defined by an ability to handle the \"heavy lifting\" of the accounting world—specifically guiding massive integrated steel plants through the intricate transition from IGAAP to IND AS. This high-level technical expertise ensures that his clients' financial reporting meets global standards with absolute precision. Based in Raipur, Arvind is also a seasoned specialist in Indirect Taxation and Internal Audits. He is more than just a consultant; he is a dedicated advocate for his clients, frequently drafting and representing cases before GST authorities. His deep understanding of the law, combined with a sharp technical grounding, allows him to resolve disputes and navigate regulatory hurdles that would otherwise stall business operations. Whether he is conducting a statutory audit or providing strategic tax advice, Arvind is recognized for his professional clarity and his commitment to delivering reliable, high-stakes solutions that allow industrial leaders to operate with total confidence."
            },
            {
              name: "Kiran Chhabhaiya",
              role: "CA . Kiran Chhabhaiya",
              degree: "(FCA, B.Com) : Raipur",
              image: "/images/partners/img_cde1f13754.webp",
              email: "kiran@mrnp.in",
              bio: "Kiran Chhabhaiya has been a dynamic force in the Raipur financial community since 2015. As a Fellow Member of the ICAI, he has built a reputation as a specialist in the high-stakes arena of Income Tax litigation. Kiran does not just manage filings; he actively represents both individuals and corporate entities before the Income Tax Department, the CIT(A), and the ITAT. His deep understanding of tax law and his ability to handle complex Appeals and Revision services make him a trusted advocate for clients facing difficult assessments or seeking strategic tax planning. While his litigation work is a cornerstone of his practice, Kiran has also carved out a unique specialization in the Audit and Assurance of charitable organizations and Non-Profit Organizations (NPOs). He understands the specific regulatory and transparency requirements that these entities face, providing them with the \"stellar\" oversight needed to maintain their status and impact. Additionally, his expertise extends to corporate growth strategies, where he advises on Project Finance, working capital management, and long-term borrowing structures. Whether he is navigating a tribunal hearing or structuring a financial plan for a new corporate venture, Kiran is known for a balanced approach that combines aggressive advocacy with sound financial integrity."
            },
            {
              name: "Hardik Surani",
              role: "CA . Hardik Surani",
              degree: "(ACA, M.Com) : Vadodara",
              image: "/images/partners/11_13717cc111.png",
              email: "",
              bio: "Hardik Surani is a Chartered Accountant with over 8 years of experience helping businesses navigate financial and regulatory challenges. Since qualifying in January 2019, he has built a strong track record in insolvency and bankruptcy matters, income tax litigations, and internal audits, offering clients clarity and practical solutions in complex situations. His work goes beyond compliance. Hardik has successfully guided organizations through restructuring and dispute resolution, ensuring that every engagement is handled with accuracy, transparency, and a problem-solving mindset. He also brings added depth through his interest in forensic audits, valuations, and due diligence, areas where his analytical skills and eye for detail provide a measurable impact. Hardik holds a Master’s degree in Commerce and has further enhanced his expertise with certifications in Bank Concurrent Audit, FAFD, and MSME. This blend of academic grounding and hands-on specialization allows him to approach each assignment with both technical precision and strategic insight. Clients and colleagues know him for his integrity, thoroughness, and commitment to delivering results that hold up under the toughest scrutiny."
            },
            {
              name: "Jigar Limbani",
              role: "ACA. Jigar Limbani",
              degree: "(ACA, CS Executive, M.com) : vadodara",
              image: "/images/partners/Untitled_1_df128f091f.png",
              email: "",
              bio: "Jigar Limbani is a highly skilled Chartered Accountant (ACA), qualified since July 2024, who brings a comprehensive and multi-disciplinary approach to financial management and legal compliance. Specializing in the dual pillars of Direct and Indirect Taxation alongside Financial Reporting and Analysis, Jigar has developed a robust professional portfolio that balances technical precision with strategic business insights. His core experience encompasses the full spectrum of tax consultancy, including VAT compliance and Direct Tax planning, ensuring that clients navigate the complexities of modern fiscal regulations with ease and accuracy. Beyond his primary expertise, Jigar offers a deep understanding of the broader corporate landscape, with a specialized focus on Audit and Assurance, RERA Advisory, and Real Estate Finance. His proficiency extends to the vital areas of Corporate Law and ROC Compliance, where he manages MCA and ROF filings to ensure seamless regulatory adherence for businesses of all sizes. With a strong educational foundation comprising an ACA designation, a Master of Commerce (M.Com), and the completion of the CS Executive level, Jigar is uniquely positioned to provide holistic Business Structuring and Advisory Services. His work is defined by a commitment to financial transparency, risk mitigation, and providing the strategic oversight necessary for sustainable corporate growth."
            },
            {
              name: "Surendra Bhagat",
              role: "CA . Surendra Bhagat",
              degree: "(CS Inter, B.Com) : Bangalore",
              image: "/images/partners/03_e383209988.png",
              email: "surendra@mrnp.in",
              bio: "Based in the vibrant business hub of Bangalore, Surendra Bhagat brings a rigorous, detail-oriented approach to the firm’s Audit and Assurance division. Currently advancing through the final stages of his Chartered Accountancy qualification, he has already built an extensive professional portfolio that spans both the public and private sectors. Surendra is particularly recognized for his versatility in conducting Internal, Statutory, and Special Audits for a diverse range of companies. His ability to navigate the different regulatory expectations of government-run entities versus private corporations allows him to provide tailored oversight that ensures every client meets the highest standards of financial transparency. In addition to his audit work, Surendra maintains a deep focus on the dual pillars of Direct and Indirect Taxation. He doesn’t just manage compliance; he provides active representation for both individuals and corporate bodies, ensuring their interests are protected during tax assessments. With a rich background in financial planning and corporate taxation, he helps clients simplify complex tax laws into manageable business strategies. Known for his technical persistence and deep-dive investigative skills, Surendra has become a key asset for organizations looking for a reliable partner to manage their internal controls and fiscal health."
            },
            {
              name: "Manoj Senghani",
              role: "CA . Manoj Senghani",
              degree: "(Inter, M.Com) : Bangalore",
              image: "/images/partners/06_c8786445e8.png",
              email: "manoj@mrnp.in",
              bio: "Manoj Senghani has built a professional reputation in the Gujarat business community as a dedicated advocate for the SME (Small and Medium Enterprise) sector. Holding a Master’s degree in Commerce from Gujarat University and having completed the CA Inter course, he brings a highly practical perspective to direct and indirect taxation. Manoj understands that smaller businesses often face unique resource constraints and complex regulatory hurdles. To bridge this gap, he provides hands-on statutory reporting and audit assurance services that are designed to be as efficient as they are thorough, ensuring that his clients remain compliant without losing focus on their day-to-day operations. What sets Manoj apart is his structured, client-first approach to financial health. He specializes in creating a secure compliance framework for businesses that need clear, reliable guidance in a fast-changing tax environment. By balancing the strict requirements of statutory audits with the practical realities of running a growing company, he has become a trusted advisor for entrepreneurs who value transparency and precision. Whether he is streamlining a tax filing process or providing long-term guidance on financial reporting, Manoj is known for his commitment to delivering results that help SMEs thrive and scale with confidence."
            },
            {
              name: "Dipak Limbani",
              role: "CA . Dipak Limbani",
              degree: "(Inter, B.Com) : Bhuj",
              image: "/images/partners/05_c440765b56.png",
              email: "dipak@mrnp.in",
              bio: "Serving as a senior associate in the Bhuj region, Dipak Limbani provides a vital link between private enterprise and government regulatory bodies. He has carved out a specialized niche in facilitating government subsidy assistance, helping businesses navigate the complex application processes for new projects, large-scale expansions, and modernization efforts. For organizations looking to scale, Dipak’s deep understanding of the incentive landscape is a significant asset, ensuring that companies capture the financial support they are entitled to while remaining fully compliant with state and central guidelines. Beyond his work with government incentives, Dipak manages a diverse portfolio of core financial services. He is a key advisor during the incorporation phase of new businesses and provides ongoing support in Transaction Consulting and Audit and Assurance. By combining his practical experience in Direct and Indirect Taxation with a focus on project-based growth, he offers a holistic approach to business consultancy. His clients value him not just for his technical accuracy in tax and audit matters, but for his proactive ability to find the financial avenues—such as subsidies and strategic planning—that help a business move from a concept to a successful operation."
            }
          ]
        });
        console.log('Default About page content seeded successfully!');
      }
    } catch (seedErr) {
      console.error('Error seeding default About page content:', seedErr);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
