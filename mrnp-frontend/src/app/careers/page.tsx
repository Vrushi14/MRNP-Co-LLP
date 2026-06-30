"use client";

import Image from "next/image";
import { ArrowRight, X, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HereToHelp from "@/components/HereToHelp";
import { apiClient, authService } from "@/utils/api";

const marqueeImages = [
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911585/20250302_093152_zvu3n8.png",
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911571/WA_1773389374744_1_ttzjo1.jpg",
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911566/IMG-20250228-WA0005_mmmaos.jpg",
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911564/20231124_170013_gztcnk.jpg",
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911563/20231128_155207_uwyxpo.jpg",
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911562/20231125_101130_inczac.jpg",
  "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1773911562/20231127_151533_ctfzar.jpg",
];

const DEFAULT_JOBS = [
  {
    department: "IT",
    position: "Software Engineer",
    city: "Vadodara",
    state: "Gujarat",
    description: "We are looking for a skilled Software Engineer to join our team. As an SDE, you will be responsible for designing, developing, and maintaining scalable software solutions. You will work closely with cross-functional teams to deliver high-quality products.",
    requirements: [
      "Design, develop, and deploy scalable applications.",
      "Write clean, maintainable, and efficient code.",
      "Collaborate with product managers and designers to implement new features.",
      "Optimize applications for performance and security.",
      "Debug and resolve software issues."
    ]
  }
];

export default function CareersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [jobsLoading, setJobsLoading] = useState(true);

  const getImageUrl = (imagePath?: string | null): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith('/uploads/')) {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
      return `${baseUrl}${imagePath}`;
    }
    return imagePath;
  };

  const [content, setContent] = useState<any>({
    heroTitle: "Join Our Team",
    heroDescription: "Students, recent graduates, seasoned professionals, and senior leaders constitute integral pillars of our success.",
    heroImage: "/careers-hero.jpg",
    cultureSec1Title: "Innovative Collaboration & Dynamic Team Culture",
    cultureSec1Paragraph1: "At MRNP, our environment fosters collaboration with top-tier talent, visionary thinkers, and industry trailblazers who are at the forefront of forging and sustaining innovative and impactful partnerships.",
    cultureSec1Paragraph2: "Our organization values a dynamic and resourceful team, characterized by youthfulness and energy, present across all our locations. We firmly uphold the belief that our people define our culture and organization, guiding every decision we make.",
    cultureSec2Title: "Culture of Excellence",
    cultureSec2Paragraph1: "At MRNP, our culture is defined by a passionate drive to contribute to global transformation initiatives. We are committed to fostering an environment where creativity flourishes and diverse perspectives thrive. We encourage open expression of ideas and embrace challenges as opportunities for growth and innovation.",
    cultureSec2Paragraph2: "We value individuals who challenge conventional norms and strive for excellence, as this mindset not only enhances personal satisfaction but also drives collective success. Despite our dynamic and forward-thinking approach, MRNP remains steadfast in upholding core values established over decades: integrity and honesty are paramount in every decision and interaction, regardless of seniority or role within the firm.",
    marqueeImages: marqueeImages
  });
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setContentLoading(true);
        const response = await apiClient.careers.getContent();
        if (response) {
          setContent((prev: any) => ({
            ...prev,
            ...response,
            marqueeImages: response.marqueeImages && response.marqueeImages.length > 0
              ? response.marqueeImages
              : prev.marqueeImages
          }));
        }
      } catch (error) {
        console.error("Error fetching careers content:", error);
      } finally {
        setContentLoading(false);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const response = await apiClient.jobs.getAll();
        if (response && response.jobs && response.jobs.length > 0) {
          setJobs(response.jobs);
        } else {
          setJobs(DEFAULT_JOBS);
        }
      } catch (error) {
        console.error("Error fetching jobs from API, using default:", error);
        setJobs(DEFAULT_JOBS);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleApplyClick = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsSidebarOpen(true);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setEducation("");
    setCurrentCompany("");
    setExperience("");
    setResumeFile(null);
    setResumeFileName("");
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(authService.isAuthenticated());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!resumeFile) {
      setErrorMessage("Please upload your resume");
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("education", education);
      formData.append("currentCompany", currentCompany);
      formData.append("experience", experience);
      formData.append("resume", resumeFile);
      formData.append("jobDepartment", selectedJob.department);
      formData.append("jobPosition", selectedJob.position);
      formData.append("jobCity", selectedJob.city);

      await apiClient.careers.apply(formData);
      setSubmitStatus("success");
    } catch (err: any) {
      console.error("Error submitting application:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setSubmitStatus("error");
    }
  };

  if (content.status === 'draft' && !isAdmin && !contentLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-24 text-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl space-y-6"
          >
            <div className="w-20 h-20 bg-primaryBlue/10 rounded-full flex items-center justify-center mx-auto text-primaryBlue animate-pulse">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
            <h1 className="font-forum text-4xl sm:text-5xl text-primaryBlue font-bold">
              Careers Portal Updating
            </h1>
            <p className="font-instrument text-[#191919] text-base sm:text-lg leading-relaxed">
              We are currently revising our career paths and opening new opportunities for visionary talent. 
              Our team is working on updates to present you with the best roles. Please check back soon!
            </p>
            <div className="pt-4">
              <a
                href="/"
                className="font-instrument inline-flex items-center text-white bg-primaryBlue px-8 py-3.5 hover:bg-primaryBlue/90 transition-all rounded-full shadow-md text-sm font-semibold"
              >
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {content.status === 'draft' && (
        <div className="bg-amber-500 text-white text-center py-2 px-4 text-xs font-bold font-instrument tracking-wider sticky top-[72px] z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>PREVIEW MODE: This page is currently a Draft. Public guests cannot see these updates.</span>
        </div>
      )}
      {/* ── HERO ── */}
      <section className="relative bg-primaryBlue pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <Navbar />
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-forum text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] 2xl:text-[6.5rem] md:leading-tight lg:leading-[5rem] xl:leading-[6.5rem] bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent pb-2"
            >
              {content.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-instrument text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-3xl leading-relaxed"
            >
              {content.heroDescription}
            </motion.p>
          </div>

          {/* Overlapping Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full mb-[-8rem] md:mb-[-12rem] lg:mb-[-16rem] xl:mb-[-25rem] z-10"
          >
            <div className="relative w-full aspect-[16/10] md:aspect-[16/7] lg:aspect-[15/7]">
              <Image
                src={getImageUrl(content.heroImage)}
                alt="Life @ MRNP & CO LLP"
                fill
                className="object-cover shadow-2xl rounded-sm"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CULTURE SECTION 1 ── */}
      <section className="relative bg-[#F5F5F0] pt-[9rem] md:pt-[14rem] lg:pt-[18rem] xl:pt-[24rem] pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-[88rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="space-y-8 md:space-y-12">
            <h2 className="font-forum text-3xl md:text-4xl lg:text-5xl text-[#13234C] leading-tight">
              {content.cultureSec1Title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <p className="font-instrument text-[#13234C] text-base md:text-xl leading-relaxed">
                {content.cultureSec1Paragraph1}
              </p>
              <p className="font-instrument text-[#13234C] text-base md:text-xl leading-relaxed">
                {content.cultureSec1Paragraph2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURE SECTION 2 ── */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-[88rem] mx-auto px-6 md:px-12 lg:px-16 mb-12 md:mb-16 lg:mb-20">
          <div className="max-w-4xl">
            <h2 className="font-forum text-3xl md:text-4xl lg:text-5xl text-primaryBlue mb-4 md:mb-6">
              {content.cultureSec2Title}
            </h2>
            <div className="font-instrument space-y-4 md:space-y-6 text-[#191919] text-base md:text-lg leading-relaxed">
              <p>
                {content.cultureSec2Paragraph1}
              </p>
              <p>
                {content.cultureSec2Paragraph2}
              </p>
            </div>
          </div>
        </div>

        {/* ── INFINITE MARQUEE ── */}
        <div className="overflow-hidden w-full relative animate-marquee-container flex py-8 mt-8">
          <div className="flex w-max animate-marquee space-x-4 md:space-x-8 px-2 md:px-4">
            {[...content.marqueeImages, ...content.marqueeImages, ...content.marqueeImages].map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative w-[280px] h-[180px] md:w-[400px] md:h-[260px] lg:w-[450px] lg:h-[300px] flex-shrink-0"
              >
                <Image
                  src={getImageUrl(imgUrl)}
                  alt={`MRNP Culture ${idx}`}
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 400px, 450px"
                  className="object-cover rounded-md md:rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT OPENINGS ── */}
      <section className="bg-white flex justify-center items-center py-9 lg:py-16">
        <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0">
          <div className="text-center flex flex-col items-center space-y-6">
            <h2 className="font-forum text-primaryBlue text-[2rem] md:text-[2.25rem] lg:text-[2.625rem] md:leading-[3.125rem] 2xl:text-[2.625rem] 2xl:leading-tight leading-tight uppercase xl:text-5xl 2xl:text-6xl">
              Current Openings
            </h2>
            <div className="md:max-w-2xl">
              <p className="font-instrument text-[#191919] text-[0.875rem] md:text-[1rem] md:leading-[1.25rem] xl:text-[1.125rem] 2xl:leading-[1.5rem]">
                Join MRNP and experience a workplace where your contributions
                matter and where integrity and innovation are at the heart of
                everything we do.
              </p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block mt-12">
            <table className="w-full">
              <thead className="bg-[#F2F5F1] border border-[#d9d9d9]">
                <tr>
                  <th className="font-instrument p-4 text-primaryBlue lg:text-2xl font-medium uppercase text-left">
                    Department
                  </th>
                  <th className="font-instrument p-4 text-primaryBlue lg:text-2xl font-medium uppercase text-left">
                    Position
                  </th>
                  <th className="font-instrument p-4 text-primaryBlue lg:text-2xl font-medium uppercase text-left">
                    City
                  </th>
                  <th className="font-instrument p-4 text-primaryBlue lg:text-2xl font-medium uppercase text-left">
                    State
                  </th>
                  <th className="font-instrument p-4 text-primaryBlue lg:text-2xl font-medium uppercase text-center">
                    Apply
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {jobsLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 font-instrument text-gray-500">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-primaryBlue" />
                        <span>Loading job openings...</span>
                      </div>
                    </td>
                  </tr>
                ) : jobs.map((job, idx) => (
                  <motion.tr 
                    key={idx} 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    className="border-b border-[#d9d9d9]"
                  >
                    <td className="font-instrument text-[#191919] text-lg py-8 px-4 text-left">
                      {job.department}
                    </td>
                    <td className="font-instrument text-[#191919] text-lg py-8 px-4 text-left">
                      {job.position}
                    </td>
                    <td className="font-instrument text-[#191919] text-lg py-8 px-4 text-left">
                      {job.city}
                    </td>
                    <td className="font-instrument text-[#191919] text-lg py-8 px-4 text-left">
                      {job.state}
                    </td>
                    <td className="text-center py-8 px-4">
                      <button 
                        onClick={() => handleApplyClick(job)}
                        className="font-instrument text-base mx-auto flex justify-center items-center text-white bg-primaryBlue px-6 md:px-8 py-3 md:py-4 hover:bg-primaryBlue/90 transition-colors duration-300 ease-in-out w-full md:w-auto rounded-full"
                      >
                        Apply Now
                        <ArrowRight className="w-5 h-5 ml-3 md:ml-4 text-white" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <motion.div 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:hidden mt-8 space-y-6"
          >
            {jobsLoading ? (
              <div className="text-center py-12 font-instrument text-gray-500 w-full">
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primaryBlue" />
                  <span>Loading job openings...</span>
                </div>
              </div>
            ) : jobs.map((job, idx) => (
              <motion.div 
                key={idx} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="border border-[#d9d9d9] rounded-lg p-4 space-y-3"
              >
                <div className="flex flex-col">
                  <span className="font-instrument text-primaryBlue font-medium text-sm">
                    Department
                  </span>
                  <span className="font-instrument text-[#191919] text-base">
                    {job.department}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-instrument text-primaryBlue font-medium text-sm">
                    Position
                  </span>
                  <span className="font-instrument text-[#191919] text-base">
                    {job.position}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-instrument text-primaryBlue font-medium text-sm">
                    City
                  </span>
                  <span className="font-instrument text-[#191919] text-base">
                    {job.city}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-instrument text-primaryBlue font-medium text-sm">
                    State
                  </span>
                  <span className="font-instrument text-[#191919] text-base">
                    {job.state}
                  </span>
                </div>
                <button 
                  onClick={() => handleApplyClick(job)}
                  className="font-instrument w-full mt-4 flex justify-center items-center text-white font-semibold bg-primaryBlue px-6 py-3 rounded-full hover:bg-primaryBlue/90 transition-colors duration-300 ease-in-out"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-3 text-white" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HereToHelp />
      <Footer />

      {/* ── SIDEBAR ── */}
      <AnimatePresence>
        {isSidebarOpen && selectedJob && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 z-[9998] backdrop-blur-sm"
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#FAF9F6] z-[9999] shadow-2xl overflow-y-auto"
            >
              <div className="p-2 relative">
                <div className="flex justify-end items-center">
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-3 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                  </button>
                </div>
                
                <div className="px-6 mt-1 space-y-3">
                  <div>
                    <h2 className="font-forum text-primaryBlue text-2xl sm:text-4xl font-semibold">
                      Tell us about yourself.
                    </h2>
                  </div>
                  
                  <div className="w-full border-t border-b border-[#d9d9d9] py-5 space-y-6">
                    <table className="w-full">
                      <thead>
                        <tr className="font-instrument text-[#13234C]">
                          <th className="font-medium text-left">Department</th>
                          <th className="font-medium text-left">Position</th>
                          <th className="font-medium text-left">City</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="font-instrument text-[#191919] text-base sm:text-lg">
                          <td className="pt-2">{selectedJob.department}</td>
                          <td className="pt-2">{selectedJob.position}</td>
                          <td className="pt-2">{selectedJob.city}</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="space-y-4">
                      <h3 className="font-instrument text-[#13234C] font-semibold text-lg md:text-2xl">
                        Job Description:
                      </h3>
                      <div className="font-instrument text-sm md:text-base text-[#191919] space-y-3 pl-3">
                        {selectedJob.description ? (
                          <p className="whitespace-pre-line">{selectedJob.description}</p>
                        ) : (
                          <p>We are looking for a skilled <strong>{selectedJob.position}</strong> to join our team. As an SDE, you will be responsible for designing, developing, and maintaining scalable software solutions. You will work closely with cross-functional teams to deliver high-quality products.</p>
                        )}

                        {selectedJob.requirements && selectedJob.requirements.length > 0 ? (
                          <>
                            <h4 className="font-semibold text-base md:text-lg mt-4">Requirements & Responsibilities</h4>
                            <ul className="pl-5 list-disc space-y-1">
                              {selectedJob.requirements.map((req: string, idx: number) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <>
                            <h4 className="font-semibold text-base md:text-lg mt-4">Responsibilities</h4>
                            <ul className="pl-5 list-disc space-y-1">
                              <li>Design, develop, and deploy scalable applications.</li>
                              <li>Write clean, maintainable, and efficient code.</li>
                              <li>Collaborate with product managers and designers to implement new features.</li>
                              <li>Optimize applications for performance and security.</li>
                              <li>Debug and resolve software issues.</li>
                            </ul>
                            
                            <h4 className="font-semibold text-base md:text-lg mt-4">Requirements</h4>
                            <ul className="pl-5 list-disc space-y-1">
                              <li>Strong proficiency in modern programming languages.</li>
                              <li>Experience with backend frameworks.</li>
                              <li>Knowledge of databases (SQL, NoSQL).</li>
                              <li>Strong problem-solving skills and a passion for technology.</li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 pb-6 pt-4">
                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="flex justify-center text-green-600">
                        <CheckCircle2 className="w-16 h-16" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-forum text-2xl font-bold text-primaryBlue">
                        Application Submitted!
                      </h3>
                      <p className="font-instrument text-gray-700 text-sm sm:text-base px-4">
                        Thank you for applying. We have received your application and resume. Our team will review your profile and get in touch with you shortly.
                      </p>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="font-instrument inline-block px-8 py-3 bg-primaryBlue text-white rounded-full hover:bg-primaryBlue/90 transition-all duration-200"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleSubmit}
                      className="space-y-3"
                      variants={{
                        hidden: {},
                        visible: { transition: { delayChildren: 0.3, staggerChildren: 0.1 } }
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      {submitStatus === "error" && (
                        <div className="bg-red-50 text-red-700 border border-red-200 text-sm font-instrument p-3 rounded-sm">
                          {errorMessage}
                        </div>
                      )}

                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <input
                          placeholder="Full Name *"
                          className="font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] focus:border-primaryBlue focus:outline-none transition-colors placeholder:text-gray-500 rounded-sm text-gray-900"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={submitStatus === "loading"}
                          required
                        />
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <input
                          placeholder="Email Address *"
                          className="font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] focus:border-primaryBlue focus:outline-none transition-colors placeholder:text-gray-500 rounded-sm text-gray-900"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={submitStatus === "loading"}
                          required
                        />
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <input
                          placeholder="Phone Number *"
                          className="font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] focus:border-primaryBlue focus:outline-none transition-colors placeholder:text-gray-500 rounded-sm text-gray-900"
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={submitStatus === "loading"}
                          required
                        />
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <input
                          placeholder="Education *"
                          className="font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] focus:border-primaryBlue focus:outline-none transition-colors placeholder:text-gray-500 rounded-sm text-gray-900"
                          type="text"
                          name="education"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          disabled={submitStatus === "loading"}
                          required
                        />
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <input
                          placeholder="Current Company"
                          className="font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] focus:border-primaryBlue focus:outline-none transition-colors placeholder:text-gray-500 rounded-sm text-gray-900"
                          type="text"
                          name="currentCompany"
                          value={currentCompany}
                          onChange={(e) => setCurrentCompany(e.target.value)}
                          disabled={submitStatus === "loading"}
                        />
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <input
                          placeholder="Years of Experience *"
                          className="font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] focus:border-primaryBlue focus:outline-none transition-colors placeholder:text-gray-500 rounded-sm text-gray-900"
                          type="text"
                          name="experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          disabled={submitStatus === "loading"}
                          required
                        />
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <label
                          htmlFor="resume"
                          className={`font-instrument w-full px-4 py-3 bg-white border-2 border-[#d9d9d9] hover:border-primaryBlue transition-colors duration-300 ease-in-out flex items-center justify-between cursor-pointer rounded-sm ${
                            submitStatus === "loading" ? "pointer-events-none opacity-50" : ""
                          }`}
                        >
                          <span className={resumeFileName ? "text-primaryBlue font-medium truncate" : "text-gray-500"}>
                            {resumeFileName || "Upload Resume *"}
                          </span>
                          <Upload className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        </label>
                        <input
                          id="resume"
                          ref={fileInputRef}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          type="file"
                          name="resume"
                          onChange={handleFileChange}
                          disabled={submitStatus === "loading"}
                        />
                      </motion.div>
                      <motion.button
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="font-instrument w-full flex justify-center items-center text-white font-semibold bg-primaryBlue px-6 py-4 hover:bg-primaryBlue/90 disabled:bg-primaryBlue/60 transition-colors duration-300 ease-in-out mt-6 rounded-sm cursor-pointer"
                      >
                        {submitStatus === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-3 animate-spin text-white" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </motion.button>
                    </motion.form>
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
