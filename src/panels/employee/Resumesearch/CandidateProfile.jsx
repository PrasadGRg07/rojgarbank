import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, FileText, User } from "lucide-react";

export default function CandidateProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await api.get(`/employee/candidates/${id}/`);
                setCandidate(response.data);
                
                // Check if saved
                const savedResponse = await api.get("/employee/saved-candidates/");
                const savedList = savedResponse.data;
                setIsSaved(savedList.some(item => item.candidate.user_id === parseInt(id)));
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidate();
    }, [id]);

    const handleMessage = async () => {
        try {
            const response = await api.post("/messaging/conversations/start/", {
                participant_id: candidate.user_id
            });
            navigate(`/employee/dashboard/messages/chat/${response.data.id}`);
        } catch (error) {
            console.error("Failed to start conversation:", error);
            alert("Failed to start conversation.");
        }
    };

    const handleToggleSave = async () => {
        try {
            const response = await api.post(`/employee/saved-candidates/${id}/toggle/`);
            setIsSaved(response.data.is_saved);
        } catch (error) {
            console.error("Failed to toggle save:", error);
            alert("Failed to save candidate.");
        }
    };

    if (loading) {
        return <div className="p-8">Loading candidate profile...</div>;
    }

    if (!candidate) {
        return <div className="p-8 text-red-500">Candidate not found.</div>;
    }

    return (
        <div className="max-w-4xl space-y-6 mx-auto p-4 sm:p-6 lg:p-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Search
            </button>

            <div className="rounded-xl bg-white p-8 shadow">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                    {candidate.profile_picture ? (
                        <img 
                            src={candidate.profile_picture} 
                            alt={candidate.name} 
                            className="w-24 h-24 rounded-full object-cover border" 
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User size={40} />
                        </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold">{candidate.name}</h1>
                        <p className="text-gray-500 mt-1">{candidate.bio || "No bio provided"}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleToggleSave}
                            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 transition ${
                                isSaved 
                                    ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" 
                                    : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                            }`}
                        >
                            {isSaved ? "Unsave Candidate" : "Save Candidate"}
                        </button>
                        <button
                            onClick={handleMessage}
                            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-white hover:bg-cyan-700 transition"
                        >
                            <MessageCircle size={18} />
                            Message
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Contact Info</h2>
                        <div className="flex items-center gap-3">
                            <Mail className="text-gray-400" size={18} />
                            <span>{candidate.email}</span>
                        </div>
                        {candidate.phone && (
                            <div className="flex items-center gap-3">
                                <Phone className="text-gray-400" size={18} />
                                <span>{candidate.phone}</span>
                            </div>
                        )}
                        {candidate.address && (
                            <div className="flex items-center gap-3">
                                <MapPin className="text-gray-400" size={18} />
                                <span>{candidate.address}</span>
                            </div>
                        )}
                        
                        {candidate.portfolio && (
                            <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                <a href={candidate.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Portfolio Website</a>
                            </div>
                        )}
                        {candidate.linkedin && (
                            <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
                            </div>
                        )}
                        {candidate.github && (
                            <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                <a href={candidate.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                            </div>
                        )}
                        {candidate.resume && (
                            <div className="flex items-center gap-3 mt-4">
                                <FileText className="text-blue-600" size={18} />
                                <a 
                                    href={(() => {
                                        let url = candidate.resume.startsWith('http') 
                                            ? candidate.resume 
                                            : `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://127.0.0.1:8000'}${candidate.resume.startsWith('/') ? '' : '/'}${candidate.resume}`;
                                        if (url.includes('cloudinary.com') && !url.match(/\.[a-zA-Z0-9]{3,4}$/)) {
                                            url += '.pdf';
                                        }
                                        return url;
                                    })()}
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-blue-600 hover:underline font-semibold"
                                >
                                    View Resume
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills && candidate.skills.length > 0 ? (
                                candidate.skills.map(s => (
                                    <span key={s.id} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        {s.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500">No skills listed.</span>
                            )}
                        </div>
                    </div>
                </div>

                {candidate.experiences && candidate.experiences.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
                        {candidate.experiences.map(exp => (
                            <div key={exp.id} className="border p-4 rounded-lg">
                                <h3 className="font-bold text-lg">{exp.position}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-sm text-gray-500">
                                    {exp.start_date} - {exp.currently_working ? "Present" : exp.end_date}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {candidate.educations && candidate.educations.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
                        {candidate.educations.map(edu => (
                            <div key={edu.id} className="border p-4 rounded-lg">
                                <h3 className="font-bold text-lg">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-sm text-gray-500">
                                    {edu.start_year} - {edu.end_year || "Present"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {candidate.certifications && candidate.certifications.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Certifications</h2>
                        {candidate.certifications.map(cert => (
                            <div key={cert.id} className="border p-4 rounded-lg">
                                <h3 className="font-bold text-lg">{cert.title}</h3>
                                <p className="text-gray-600">{cert.organization}</p>
                                <p className="text-sm text-gray-500">
                                    {cert.issue_date} {cert.expiry_date ? `- ${cert.expiry_date}` : ""}
                                </p>
                                {cert.credential_url && (
                                    <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm mt-2 block">
                                        View Credential
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {candidate.portfolios && candidate.portfolios.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Portfolio Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {candidate.portfolios.map(proj => (
                                <div key={proj.id} className="border rounded-lg overflow-hidden flex flex-col">
                                    {proj.image && (
                                        <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover" />
                                    )}
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="font-bold text-lg">{proj.title}</h3>
                                        <p className="text-sm text-blue-600 mb-2">{proj.project_type}</p>
                                        <p className="text-gray-600 text-sm flex-1">{proj.description}</p>
                                        <div className="flex gap-4 mt-4 pt-4 border-t">
                                            {proj.project_url && (
                                                <a href={proj.project_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                                                    Live Demo
                                                </a>
                                            )}
                                            {proj.github_url && (
                                                <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
