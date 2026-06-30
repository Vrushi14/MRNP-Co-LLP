"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HereToHelp from "@/components/HereToHelp";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const values = [
  {
    title: "Putting Clients First:",
    description:
      "For us, it's all about you. We listen carefully to understand your challenges and goals, so we can tailor solutions that truly make a difference to your business. Your success is our priority, and we're committed to going above and beyond to deliver results you can rely on.",
    icon: "/about/vector2.svg",
  },
  {
    title: "Delivering Excellence:",
    description:
      "Quality is at the heart of everything we do. We hold ourselves to the highest standards, ensuring that every piece of advice and every service we provide meets your expectations and ours. It's about accuracy, reliability, and exceeding your expectations.",
    icon: "/about/vector3.svg",
  },
  {
    title: "On Time, Every Time:",
    description:
      "We get it—deadlines matter. You can count on us to deliver when we say we will. Consistency in meeting deadlines is part of our promise to you, so you can plan with confidence knowing we've got your back.",
    icon: "/about/vector4.svg",
  },
  {
    title: "Building Trusting Relationships:",
    description:
      "Trust is earned through transparency, respect, and reliability. We believe in building strong, lasting partnerships with our clients. By understanding your business inside out, we can anticipate your needs and grow together through thick and thin.",
    icon: "/about/vector5.svg",
  },
  {
    title: "Integrity and Teamwork:",
    description:
      "We operate with integrity in everything we do. Honesty, transparency, and ethical behavior are non-negotiable. We value teamwork and collaboration, pooling our expertise to find innovative solutions that solve your toughest challenges.",
    icon: "/about/vector6.svg",
  },
  {
    title: "Passion and Leadership:",
    description:
      "Quality is at the heart of everything we do. We hold ourselves to the highest standards, ensuring that every piece of advice and every service we provide meets your expectations and ours. It's about accuracy, reliability, and exceeding your expectations.",
    icon: "/about/vector1.svg",
  },
];

const partners = [
  {
    name: "Mahesh Limbani",
    role: "CA . Mahesh Limbani",
    degree: "(FCA, B.Com) : Gandhidham",
    image: "/images/partners/12_8192b51029.png",
    email: "mahesh@mrnp.in",
    bio: "With over a decade of distinguished standing in the accounting profession, Mahesh Limbani is a Fellow Member of the Institute of Chartered Accountants of India (ICAI). He has built a reputation as a strategic financial advisor, specializing in a comprehensive suite of financial services designed to drive corporate growth and stability. His core expertise lies in corporate financial planning, where he assists organizations in navigating the complexities of both short-term and long-term borrowing. By focusing on robust project finance strategies and efficient working capital management, Mahesh Limbani ensures that businesses maintain the liquidity and capital structure necessary to thrive in competitive markets. Beyond his work in financial strategy, Mahesh Limbani brings a wealth of experience to the critical fields of Direct and Indirect Taxation, assurance, and professional accounting. He is particularly recognized for his deep technical expertise in Service Tax, providing high-level advisory, planning, and compliance services. His practice serves a diverse portfolio of clients, ranging from emerging SMEs to large-scale corporate entities. By bridging the gap between complex regulatory requirements and practical business goals, Mahesh Limbani delivers tailored solutions that ensure fiscal compliance while maximizing long-term financial health.",
  },
  {
    name: "Mukeshkumar Senghani",
    role: "CA . Mukeshkumar Senghani",
    degree: "(FCA, B.com) : Gandhidham",
    image: "/images/partners/04_d90dae2878.png",
    email: "mukesh@mrnp.in",
    bio: "As a Fellow Member of the Institute of Chartered Accountants of India, Mukesh Senghani has spent over six years building a specialized practice centered on the complexities of state and central indirect taxation. His professional foundation was built on mastering State VAT and Professional Tax, where he became a trusted advisor for businesses navigating the specific requirements of Gujarat Value Added Tax (GVAT). Mukesh is particularly well-versed in the nuances of Works Contracts, providing SMEs and corporate clients with the detailed audit and compliance support necessary to manage state-level tax obligations without disruption. With the shift to India’s current tax regime, Mukesh transitioned his deep knowledge of indirect taxes to become a specialist in the Goods and Services Tax (GST). He now focuses on guiding businesses through the entire GST lifecycle, from high-level planning and advisory to day-to-day compliance and filing. By staying ahead of evolving regulations, he helps his clients bridge the gap between their legacy tax practices and modern requirements. Whether he is working with a growing startup or an established corporation, Mukesh’s approach is defined by a commitment to precision and a practical understanding of how tax strategy impacts a company's overall financial health.",
  },
  {
    name: "Ritesh Rangani",
    role: "CA . Ritesh Rangani",
    degree: "(FCA, B.Com, ISA) : Bangalore",
    image: "/images/partners/02_1e066f3d16.png",
    email: "ritesh@mrnp.in",
    bio: "Based in Bangalore, CA Ritesh Rangani is a Fellow Member of the Institute of Chartered Accountants of India (ICAI) with over nine years of deep-rooted expertise in the financial sector. His professional journey is characterized by a high degree of proficiency in Statutory, Tax, and Internal Audits, alongside a dedicated focus on management consultancy. As an Information Systems Auditor (ISA), Ritesh brings a tech-forward perspective to his work, ensuring that traditional accounting practices meet modern digital standards through specialized services like System Audits, KYC Audits, and Compliance reviews. Ritesh’s impact extends significantly into the realm of corporate finance and business expansion. He has become a key resource for clients seeking government assistance for new projects, modernizations, or facility expansions. His extensive knowledge of the Industries Commissionerate and various financial institutions allows him to bridge the gap between business needs and capital requirements—whether that involves securing Term Loans, Mortgage Loans, or managing Cash-Credit and Overdraft facilities. Beyond consultancy, Ritesh is highly regarded for his technical command over the banking sector’s audit requirements. He has successfully led a diverse range of bank-related assignments, including Concurrent, Revenue, and Stock-receivable Audits. By maintaining strong professional ties with executives across the banking and financial landscape, he provides his clients in Bangalore and beyond with a distinct advantage. His approach combines the rigor of Payroll and Compliance Audits with a strategic mindset, helping businesses remain compliant while optimizing their financial health.",
  },
  {
    name: "Nemish Patel",
    role: "CA. Nemish Patel",
    degree: "(FCA, LLB, B.Com) : Vadodara",
    image: "/images/partners/01_7decc3f311.png",
    email: "nemish@mrnp.in",
    bio: "Based in Vadodara, CA Nemish Patel offers a unique blend of financial and legal expertise as a Fellow Member of the Institute of Chartered Accountants of India and a graduate of Law (LLB). With a professional career spanning over eight years, he has carved out a niche in providing sophisticated advisory services that bridge the gap between complex Indian regulations and global business needs. Nemish is particularly recognized for his work with Non-Resident Indians (NRIs) and foreign corporations, where he facilitates seamless Foreign Direct Investment (FDI) and provides strategic guidance on international financial services, project finance, and effective working capital management. His dual background in accounting and law makes him a formidable representative in Income Tax assessment and tribunal matters. He goes beyond standard tax planning to offer high-level litigation support and liasioning, ensuring that his clients' interests are protected at every level of the tax hierarchy. This legal perspective adds a layer of depth to his management consultancy, specifically when navigating the intricacies of insurance claim matters or designing robust internal control systems tailored to the specific risk profiles of Indian and international corporate. Beyond traditional auditing, Nemish is a vital partner for businesses undergoing digital transformation. He has extensive experience in \"bridging services,\" acting as the critical link between management and technical teams to ensure the successful implementation of SAP and other ERP systems. By combining accounting assurance with a deep understanding of business processes, he helps organizations modernize their infrastructure while maintaining strict financial integrity. Whether advising a startup on its first borrowing structure or representing a large corporate entity in a tax dispute, his approach remains focused on clarity, compliance, and long-term fiscal health.",
  },
  {
    name: "Paresh Patel",
    role: "CA. Paresh Patel",
    degree: "(FCA, M.Com) : Vadodara",
    image: "/images/partners/10_3e0706321c.png",
    email: "paresh@mrnp.in",
    bio: "With a professional career spanning over 11 years, Paresh Patel has established himself as a versatile Fellow Member of the Institute of Chartered Accountants of India. His expertise is rooted in a deep understanding of the Indian tax landscape, having successfully guided clients through the transition from legacy systems like State VAT into the modern eras of GST and RERA. Today, he is a key advisor for both corporate and non-corporate entities, specializing in the complexities of GST compliance and litigation. His proactive approach to income tax matters and his ability to represent clients in litigation reflect a professional who is as comfortable in a courtroom setting as he is with a balance sheet. Beyond his taxation practice, Paresh has built a significant reputation within the banking and financial sectors. Holding a specialized Certificate in Concurrent Audit of Banks, he has led extensive statutory, internal, and revenue audits for various bank branches. This technical proficiency is complemented by his work in management advisory and project finance, where he helps businesses secure subsidies and optimize their investment strategies. Academically grounded with both a B.Com and M.Com to support his FCA status, Paresh is recognized by his clients for an ethical, solution-oriented approach. He remains dedicated to providing clear-cut financial leadership, ensuring that every client—regardless of their size—benefits from transparent and high-integrity consultancy.",
  },
  {
    name: "Hiren Divani",
    role: "CA . Hiren Divani",
    degree: "(FCA, B.Com, FAFD) : Surat",
    image: "/images/partners/07_34178313aa.png",
    email: "hiren@mrnp.in",
    bio: "Since entering the profession in 2015, Hiren Divani has built a practice in Surat that stands out for its analytical depth and technical precision. While many focus solely on standard compliance, Hiren has developed a specialized edge through his certification in Forensic Accounting and Fraud Detection (FAFD). This allow him to offer an investigative perspective that is increasingly vital for modern businesses, ensuring that Income Tax audits, stock audits, and bank audits are handled with a level of scrutiny that goes beyond the surface. His approach isn't just about finding errors; it’s about providing business owners with the peace of mind that their financial systems are secure and transparent. His work also reflects the changing landscape of the Indian economy, particularly through his consultancy in the renewable energy sector. Hiren bridges the gap between traditional accounting and forward-thinking financial strategy, assisting clients with Portfolio Management Services (PMS) and Project Finance. By combining his academic background as an FCA and B.Com graduate with a sharp eye for market opportunities, he helps organizations align their tax planning with long-term growth. Whether he is navigating a complex bank audit or advising on a new green energy venture, Hiren is known for delivering practical, high-integrity solutions that help businesses thrive in a regulated environment.",
  },
  {
    name: "Nikul Ramani",
    role: "CA . Nikul Ramani",
    degree: "(FCA, B.Com) : Surat",
    image: "/images/partners/08_02dd9a3bf3.png",
    email: "nikul@mrnp.in",
    bio: "Nikul Ramani joined the profession with a deep focus on the evolving landscape of Indian taxation, bringing over six years of intensive experience to his role as an Associate Member of the ICAI. He is perhaps best known for his pivotal work during the nationwide shift to the Goods and Services Tax (GST). As a pioneer in this space, Nikul was instrumental in helping businesses navigate the initial chaos of the transition, ensuring that his clients' systems were not only compliant but optimized for the new tax regime. Today, he continues to serve as a vital consultant, providing the high-level advisory and strategy needed to manage complex GST frameworks for a diverse portfolio of clients. Beyond his expertise in indirect tax, Nikul acts as a primary advisor for Income Tax and TDS matters, bridging the gap between day-to-day compliance and long-term fiscal health. His practice is built on the belief that tax planning should be integrated with overall financial management. By leveraging his rich background in financial planning, he helps businesses structure their operations to maintain liquidity while minimizing tax liabilities. Whether he is solving a complicated TDS issue or drafting a comprehensive financial plan, Nikul is recognized for his hands-on approach and his ability to provide clear, decisive guidance in a rapidly changing regulatory environment.",
  },
  {
    name: "Arvind Keshrani",
    role: "CA . Arvind Keshrani",
    degree: "(FCA, B.Com) : Raipur",
    image: "/images/partners/09_72714292ac.png",
    email: "arvind@mrnp.in",
    bio: "For over a decade, Arvind Keshrani has served as a cornerstone for businesses operating within India’s most demanding industrial sectors. Since becoming a Fellow Member of the ICAI in 2013, he has managed the complex financial oversight required for listed companies, large-scale cement plants, and mega power projects. His career is defined by an ability to handle the \"heavy lifting\" of the accounting world—specifically guiding massive integrated steel plants through the intricate transition from IGAAP to IND AS. This high-level technical expertise ensures that his clients' financial reporting meets global standards with absolute precision. Based in Raipur, Arvind is also a seasoned specialist in Indirect Taxation and Internal Audits. He is more than just a consultant; he is a dedicated advocate for his clients, frequently drafting and representing cases before GST authorities. His deep understanding of the law, combined with a sharp technical grounding, allows him to resolve disputes and navigate regulatory hurdles that would otherwise stall business operations. Whether he is conducting a statutory audit or providing strategic tax advice, Arvind is recognized for his professional clarity and his commitment to delivering reliable, high-stakes solutions that allow industrial leaders to operate with total confidence.",
  },
  {
    name: "Kiran Chhabhaiya",
    role: "CA . Kiran Chhabhaiya",
    degree: "(FCA, B.Com) : Raipur",
    image: "/images/partners/img_cde1f13754.webp",
    email: "kiran@mrnp.in",
    bio: "Kiran Chhabhaiya has been a dynamic force in the Raipur financial community since 2015. As a Fellow Member of the ICAI, he has built a reputation as a specialist in the high-stakes arena of Income Tax litigation. Kiran does not just manage filings; he actively represents both individuals and corporate entities before the Income Tax Department, the CIT(A), and the ITAT. His deep understanding of tax law and his ability to handle complex Appeals and Revision services make him a trusted advocate for clients facing difficult assessments or seeking strategic tax planning. While his litigation work is a cornerstone of his practice, Kiran has also carved out a unique specialization in the Audit and Assurance of charitable organizations and Non-Profit Organizations (NPOs). He understands the specific regulatory and transparency requirements that these entities face, providing them with the \"stellar\" oversight needed to maintain their status and impact. Additionally, his expertise extends to corporate growth strategies, where he advises on Project Finance, working capital management, and long-term borrowing structures. Whether he is navigating a tribunal hearing or structuring a financial plan for a new corporate venture, Kiran is known for a balanced approach that combines aggressive advocacy with sound financial integrity.",
  },
  {
    name: "Hardik Surani",
    role: "CA . Hardik Surani",
    degree: "(ACA, M.Com) : Vadodara",
    image: "/images/partners/11_13717cc111.png",
    email: "",
    bio: "Hardik Surani is a Chartered Accountant with over 8 years of experience helping businesses navigate financial and regulatory challenges. Since qualifying in January 2019, he has built a strong track record in insolvency and bankruptcy matters, income tax litigations, and internal audits, offering clients clarity and practical solutions in complex situations. His work goes beyond compliance. Hardik has successfully guided organizations through restructuring and dispute resolution, ensuring that every engagement is handled with accuracy, transparency, and a problem-solving mindset. He also brings added depth through his interest in forensic audits, valuations, and due diligence, areas where his analytical skills and eye for detail provide a measurable impact. Hardik holds a Master’s degree in Commerce and has further enhanced his expertise with certifications in Bank Concurrent Audit, FAFD, and MSME. This blend of academic grounding and hands-on specialization allows him to approach each assignment with both technical precision and strategic insight. Clients and colleagues know him for his integrity, thoroughness, and commitment to delivering results that hold up under the toughest scrutiny.",
  },
  {
    name: "Jigar Limbani",
    role: "ACA. Jigar Limbani",
    degree: "(ACA, CS Executive, M.com) : vadodara",
    image: "/images/partners/Untitled_1_df128f091f.png",
    email: "",
    bio: "Jigar Limbani is a highly skilled Chartered Accountant (ACA), qualified since July 2024, who brings a comprehensive and multi-disciplinary approach to financial management and legal compliance. Specializing in the dual pillars of Direct and Indirect Taxation alongside Financial Reporting and Analysis, Jigar has developed a robust professional portfolio that balances technical precision with strategic business insights. His core experience encompasses the full spectrum of tax consultancy, including VAT compliance and Direct Tax planning, ensuring that clients navigate the complexities of modern fiscal regulations with ease and accuracy. Beyond his primary expertise, Jigar offers a deep understanding of the broader corporate landscape, with a specialized focus on Audit and Assurance, RERA Advisory, and Real Estate Finance. His proficiency extends to the vital areas of Corporate Law and ROC Compliance, where he manages MCA and ROF filings to ensure seamless regulatory adherence for businesses of all sizes. With a strong educational foundation comprising an ACA designation, a Master of Commerce (M.Com), and the completion of the CS Executive level, Jigar is uniquely positioned to provide holistic Business Structuring and Advisory Services. His work is defined by a commitment to financial transparency, risk mitigation, and providing the strategic oversight necessary for sustainable corporate growth.",
  },
  {
    name: "Surendra Bhagat",
    role: "CA . Surendra Bhagat",
    degree: "(CS Inter, B.Com) : Bangalore",
    image: "/images/partners/03_e383209988.png",
    email: "surendra@mrnp.in",
    bio: "Based in the vibrant business hub of Bangalore, Surendra Bhagat brings a rigorous, detail-oriented approach to the firm’s Audit and Assurance division. Currently advancing through the final stages of his Chartered Accountancy qualification, he has already built an extensive professional portfolio that spans both the public and private sectors. Surendra is particularly recognized for his versatility in conducting Internal, Statutory, and Special Audits for a diverse range of companies. His ability to navigate the different regulatory expectations of government-run entities versus private corporations allows him to provide tailored oversight that ensures every client meets the highest standards of financial transparency. In addition to his audit work, Surendra maintains a deep focus on the dual pillars of Direct and Indirect Taxation. He doesn’t just manage compliance; he provides active representation for both individuals and corporate bodies, ensuring their interests are protected during tax assessments. With a rich background in financial planning and corporate taxation, he helps clients simplify complex tax laws into manageable business strategies. Known for his technical persistence and deep-dive investigative skills, Surendra has become a key asset for organizations looking for a reliable partner to manage their internal controls and fiscal health.",
  },
  {
    name: "Manoj Senghani",
    role: "CA . Manoj Senghani",
    degree: "(Inter, M.Com) : Bangalore",
    image: "/images/partners/06_c8786445e8.png",
    email: "manoj@mrnp.in",
    bio: "Manoj Senghani has built a professional reputation in the Gujarat business community as a dedicated advocate for the SME (Small and Medium Enterprise) sector. Holding a Master’s degree in Commerce from Gujarat University and having completed the CA Inter course, he brings a highly practical perspective to direct and indirect taxation. Manoj understands that smaller businesses often face unique resource constraints and complex regulatory hurdles. To bridge this gap, he provides hands-on statutory reporting and audit assurance services that are designed to be as efficient as they are thorough, ensuring that his clients remain compliant without losing focus on their day-to-day operations. What sets Manoj apart is his structured, client-first approach to financial health. He specializes in creating a secure compliance framework for businesses that need clear, reliable guidance in a fast-changing tax environment. By balancing the strict requirements of statutory audits with the practical realities of running a growing company, he has become a trusted advisor for entrepreneurs who value transparency and precision. Whether he is streamlining a tax filing process or providing long-term guidance on financial reporting, Manoj is known for his commitment to delivering results that help SMEs thrive and scale with confidence.",
  },
  {
    name: "Dipak Limbani",
    role: "CA . Dipak Limbani",
    degree: "(Inter, B.Com) : Bhuj",
    image: "/images/partners/05_c440765b56.png",
    email: "dipak@mrnp.in",
    bio: "Serving as a senior associate in the Bhuj region, Dipak Limbani provides a vital link between private enterprise and government regulatory bodies. He has carved out a specialized niche in facilitating government subsidy assistance, helping businesses navigate the complex application processes for new projects, large-scale expansions, and modernization efforts. For organizations looking to scale, Dipak’s deep understanding of the incentive landscape is a significant asset, ensuring that companies capture the financial support they are entitled to while remaining fully compliant with state and central guidelines. Beyond his work with government incentives, Dipak manages a diverse portfolio of core financial services. He is a key advisor during the incorporation phase of new businesses and provides ongoing support in Transaction Consulting and Audit and Assurance. By combining his practical experience in Direct and Indirect Taxation with a focus on project-based growth, he offers a holistic approach to business consultancy. His clients value him not just for his technical accuracy in tax and audit matters, but for his proactive ability to find the financial avenues—such as subsidies and strategic planning—that help a business move from a concept to a successful operation.",
  },
];

const getImageUrl = (imagePath?: string | null): string | null => {
  if (!imagePath) return null;
  if (imagePath.startsWith('/uploads/')) {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  return imagePath;
};

export default function AboutPage() {
  const [heroTitle, setHeroTitle] = useState("Empowering Financial Futures.");
  const [heroDescription, setHeroDescription] = useState(
    "We see each client as unique, with their own set of goals and challenges. That's why we don't offer a one-size-fits-all solution. We're dedicated to understanding your specific needs and working tirelessly to deliver the best possible results."
  );
  const [commitmentImage, setCommitmentImage] = useState("/images/about-group.png");
  const [commitmentTitle, setCommitmentTitle] = useState("An everlasting commitment to fiduciary values");
  const [commitmentParagraphs, setCommitmentParagraphs] = useState<string[]>([
    "Established in 2011, MRNP & CO LLP is a distinguished Chartered Accountant firm with a robust presence across multiple states including Bengaluru, Ahmedabad, Raipur, Surat, Vadodara, Gandhidham, and Bhuj. Founded by a cadre of young, dynamic professionals with extensive backgrounds in top consulting firms, our firm specializes in delivering customized solutions to meet the diverse needs of our clients.",
    "At MRNP & CO LLP, we are committed to providing high-quality, timely services tailored to industry-specific requirements. Our team comprises talented professionals who leverage their expertise to deliver technology-enabled solutions that ensure client success. We prioritize a collaborative approach, fostering synergy across our service areas to offer comprehensive solutions even in the most complex scenarios."
  ]);
  const [valuesList, setValuesList] = useState<any[]>(values);
  const [partnersList, setPartnersList] = useState<any[]>(partners);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/about`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            if (data.heroTitle) setHeroTitle(data.heroTitle);
            if (data.heroDescription) setHeroDescription(data.heroDescription);
            if (data.commitmentImage) setCommitmentImage(data.commitmentImage);
            if (data.commitmentTitle) setCommitmentTitle(data.commitmentTitle);
            if (data.commitmentParagraphs && data.commitmentParagraphs.length > 0) {
              setCommitmentParagraphs(data.commitmentParagraphs);
            }
            if (data.values && data.values.length > 0) {
              setValuesList(data.values);
            }
            if (data.partners && data.partners.length > 0) {
              setPartnersList(data.partners);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to fetch About Us page content, using static fallback:", err);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />

      {/* About Hero */}
      <section className="relative bg-primaryBlue pt-32 pb-32 md:pt-40 md:pb-48 lg:pt-44 lg:pb-56 overflow-visible">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-forum text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] 2xl:text-[6.5rem] md:leading-tight lg:leading-[5rem] xl:leading-[6.5rem] bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent pb-2"
            >
              {heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-instrument text-base md:text-lg lg:text-xl text-white max-w-4xl leading-relaxed"
            >
              {heroDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Commitment Section with Overlapping Image */}
      <section className="bg-[#F5F5F0] pb-16 md:pb-20 lg:pb-24">
        <div className="relative -mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 z-20 container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            <div className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {getImageUrl(commitmentImage) ? (
                <Image
                  src={getImageUrl(commitmentImage)!}
                  alt="About MRNP Group"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  loading="lazy"
                />
              ) : null}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="container mx-auto px-6 md:px-12 lg:px-16 pt-6 md:pt-8"
        >
          <div className="space-y-8 md:space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-forum text-3xl md:text-4xl lg:text-5xl text-primaryBlue leading-tight"
            >
              {commitmentTitle}
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {commitmentParagraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (idx + 1) }}
                  className="font-instrument text-primaryBlue text-base md:text-xl leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 md:px-4">
          <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-forum text-3xl md:text-4xl lg:text-5xl text-primaryBlue mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-instrument text-sm md:text-base leading-relaxed text-gray-800"
            >
              At MRNP & Co. LLP, our values aren&apos;t just words on paper—they&apos;re
              the essence of how we do business and interact with our clients
              every day:
            </motion.p>
          </div>

          <motion.div 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200 max-w-7xl mx-auto"
          >
            {valuesList.map((value, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className={`p-8 md:p-12 lg:p-16 flex flex-col space-y-4 border-b border-gray-200 ${index % 2 === 0 ? "md:border-r" : ""
                  }`}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mb-4">
                  {getImageUrl(value.icon) ? (
                    <Image
                      src={getImageUrl(value.icon)!}
                      alt={value.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>
                <h3 className="font-instrument font-medium text-2xl md:text-3xl text-primaryBlue">
                  {value.title}
                </h3>
                <p className="font-instrument text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* People Section */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-forum text-3xl md:text-4xl lg:text-5xl text-primaryBlue mb-12"
          >
            Our People
          </motion.h2>
          <motion.div 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {partnersList.filter(person => person.isActive !== false).map((person, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                onClick={() => setSelectedPartner(person)}
                className="flex flex-col group cursor-pointer text-left"
              >
                <div className="relative aspect-[5/6] overflow-hidden bg-gray-100 mb-4">
                  {getImageUrl(person.image) ? (
                    <Image
                      src={getImageUrl(person.image)!}
                      alt={person.name}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <h3 className="font-forum text-xl md:text-2xl text-primaryBlue mt-2">
                  {person.role || person.name}
                </h3>
                <p className="font-instrument text-sm text-gray-500">
                  {person.degree}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HereToHelp />

      <Footer />
      {/* Partner Sidebar */}
      <AnimatePresence>
        {selectedPartner && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPartner(null)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[9999] shadow-xl overflow-y-auto overscroll-contain"
            >
              <div className="p-2 relative text-black">
                {/* Close Button Wrapper */}
                <div className="flex justify-end items-center">
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="p-2 text-gray-400 hover:text-primaryBlue transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content Wrapper */}
                <div className="px-1 sm:px-3 md:px-6 mt-1 space-y-4 md:space-y-8 pb-8">
                  {/* Image Container */}
                  <div className="relative w-full max-w-[280px] aspect-[5/6] overflow-hidden bg-gray-100 shadow-lg">
                    {getImageUrl(selectedPartner.image) ? (
                      <Image
                        src={getImageUrl(selectedPartner.image)!}
                        alt={selectedPartner.name}
                        fill
                        className="object-contain"
                      />
                    ) : null}
                  </div>

                  {/* Name and Degree Section */}
                  <div>
                    <p className="font-forum text-primaryBlue text-[2rem] md:text-[2.25rem] lg:text-[2.625rem] md:leading-[3.125rem] 2xl:text-[2.625rem] 2xl:leading-tight leading-tight mb-2">
                      {selectedPartner.role || selectedPartner.name}
                    </p>
                    <p className="font-instrument text-[#191919] text-[0.875rem] md:text-[1rem] md:leading-[1.25rem] xl:text-[1.125rem] 2xl:!leading-[1.5rem]">
                      {selectedPartner.degree}
                    </p>
                  </div>

                  {/* Bio Section */}
                  <div>
                    <p className="font-instrument text-[#191919] text-[0.875rem] md:text-[1rem] md:leading-[1.25rem] xl:text-[1.125rem] 2xl:!leading-[1.5rem]">
                      {selectedPartner.bio}
                    </p>
                  </div>

                  {/* Contact Info */}
                  {selectedPartner.email && (
                    <div className="border-t border-gray-200 pt-8">
                      <h4 className="font-instrument font-bold text-sm tracking-widest text-gray-400 uppercase mb-6">
                        CONTACT INFO
                      </h4>
                      <div className="space-y-4 text-primaryBlue">
                        <div className="flex items-center space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          <span className="font-instrument text-lg underline decoration-1 underline-offset-4">
                            {selectedPartner.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

