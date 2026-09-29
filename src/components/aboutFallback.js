import ceo from '../assets/ceo.png'
import cfo from '../assets/cfo.png'
import manager from '../assets/manager.png'
import hr from '../assets/hr.png'
import fd from '../assets/fd.png'
import mission from '../assets/mission.png'
import vision from '../assets/vision.png'
import opp from '../assets/opp.png'
import wr from '../assets/wr.png'

/**
 * The copy the About page shipped with, used only when the content API cannot
 * be reached. Once an admin saves anything in the panel, the API is the source
 * of truth and this is never rendered.
 *
 * Long-form fields are HTML (rich text from the Quill editor in the admin
 * panel), so the fallback renders through exactly the same code path.
 */
const aboutFallback = {
    page: {
        hero_title: "Empowering People.",
        hero_title_highlight: "Building Organizations.",
        hero_subtitle:
            "Connecting talented people with meaningful opportunities while helping organizations build stronger, future-ready teams.",
        intro_paragraphs:
            "<p><strong>ROJGAR BANK Private Limited</strong>, established in 2073 B.S., is one of Nepal's leading Human Resource, Recruitment, Training, and Workforce Outsourcing companies, headquartered in Kathmandu. With <strong>10+ years of industry experience</strong>, we have been empowering organizations with strategic workforce solutions while connecting talented professionals with rewarding career opportunities across Nepal.</p>" +
            "<p>Over the years, we have earned the trust of businesses across diverse industries by delivering reliable, innovative, and results-driven HR solutions. Our comprehensive service portfolio includes recruitment and executive search, employee outsourcing, payroll administration, temporary staffing, corporate training, HR consulting, and end-to-end workforce management. Every solution is designed to help organizations enhance productivity, improve operational efficiency, and achieve sustainable business growth.</p>" +
            "<p>Backed by a highly experienced HR team, a robust talent network, and modern recruitment practices, we provide customized, cost-effective, and compliant workforce solutions that create long-term value for both employers and job seekers.</p>",
        show_intro: true,
        commitment_title: "Our Commitment",
        commitment_text:
            "Integrity, professionalism, innovation, excellence, and customer commitment guide everything we do.",
        show_commitment: true,
        show_achievements: true,
        achievements_title: "Our Achievements",
        achievements_paragraphs:
            "<p>At <strong>ROJGAR BANK</strong>, we believe that people are the foundation of every successful organization. We are committed to helping businesses build high-performing teams while empowering individuals through professional recruitment, career development, skill enhancement, and employment opportunities.</p>" +
            "<p>Driven by our core values of <strong>Integrity, Professionalism, Innovation, Excellence, and Customer Commitment</strong>, we continue to build long-term partnerships by delivering dependable, ethical, and value-driven HR solutions that exceed client expectations.</p>",
        show_leadership: true,
        leadership_title: "Leadership That Puts People First",
        leadership_subtitle:
            "Meet the team guiding our mission, our values, and the way we work every single day.",
        show_pillars: true,
        pillars_title: "",
        show_team: true,
        team_title: "Our Team",
    },
    achievements: [
        { id: 'fb-1', value: '10+', label: 'Years of HR & Recruitment Excellence' },
        { id: 'fb-2', value: '50,000+', label: 'Qualified Candidate CV Database' },
        { id: 'fb-3', value: '1,000+', label: 'Successful Candidate Placements' },
        { id: 'fb-4', value: '300+', label: 'Corporate Clients Across Nepal' },
        { id: 'fb-5', value: '20+', label: 'Live Job Opportunities Published Daily' },
        { id: 'fb-6', value: '500,000+', label: 'Professional Network' },
    ],
    leadership: [
        {
            id: 'fb-ceo',
            name: 'CEO',
            role: 'Chief Executive Officer',
            image_url: ceo,
            message:
                "<p>From my professional experience, I have realized that people are the foundation of every organization's success. At Rojgar Bank Private Limited, we are committed to bridging the gap between talent and opportunities across Nepal. Our mission has always been to build a reliable, ethical, and professional platform where job seekers can discover meaningful career opportunities and employers can find the right individuals to strengthen and grow their organizations. As we continue to expand and diversify our services.</p>",
        },
        {
            id: 'fb-manager',
            name: 'Manager',
            role: 'Recruitment Manager',
            image_url: manager,
            message:
                "<p>At Rojgar Bank Private Limited, we believe that every successful placement creates opportunities for both individuals and organizations to grow. Our commitment is to provide reliable, ethical, and professional recruitment services by connecting talented job seekers with the right employers across Nepal. We strive to understand the unique needs of every client and candidate, ensuring the best possible match through a transparent and efficient recruitment process. As we continue to expand our services.</p>",
        },
    ],
    pillars: [
        {
            id: 'fb-mission',
            title: "Our Mission",
            image_url: mission,
            description:
                "<p>To bridge the gap between employers and job seekers through professional recruitment, quality training, reliable workforce outsourcing, and strategic HR solutions while maintaining the highest standards of integrity, service excellence, innovation, and customer satisfaction.</p>",
        },
        {
            id: 'fb-vision',
            title: "Our Vision",
            image_url: vision,
            description:
                "<p>To become Nepal's most trusted, innovative, and preferred human resource solutions provider by connecting people with opportunities and enabling organizations to build a future-ready workforce.</p>",
        },
        {
            id: 'fb-opp',
            title: "Opportunities at Rojgar Bank",
            image_url: opp,
            description:
                "<p>At Rojgar Bank Private Limited, we believe that talented people are the key to success. We are always looking for passionate, dedicated, and skilled individuals who are eager to grow their careers while making a meaningful impact. Join our team and become part of an organization that values innovation, integrity, teamwork, and continuous professional development. Together, let's build a brighter future for Nepal's workforce.</p>",
        },
        {
            id: 'fb-wr',
            title: "Why Choose Rojgar Bank?",
            image_url: wr,
            description:
                "<p>At Rojgar Bank Private Limited, we do more than just fill vacancies—we build careers and strengthen organizations. Through our personalized recruitment approach, industry expertise, and extensive network of talented professionals, we connect the right people with the right opportunities. We believe recruitment is not simply about matching candidates with jobs, but about creating meaningful careers, empowering businesses, and contributing to the long-term growth of Nepal's workforce.</p>",
        },
    ],
    team: [
        {
            id: 'fb-dinesh',
            name: "Dinesh Bhatt",
            role: "Business Development Manager",
            bio:
                "<p>Business Development Manager with experience in identifying new business opportunities, building and maintaining strong client relationships, developing strategic partnerships, and driving revenue growth.</p>",
            image_url: hr,
        },
        {
            id: 'fb-pappu',
            name: "Pappu Kumar Sah",
            role: "Finance and Accounts Officer",
            bio:
                "<p>Finance and Accounts Professional with experience in managing financial records, budgeting, payroll processing, taxation, bank reconciliation, invoicing, and financial reporting.</p>",
            image_url: fd,
        },
        {
            id: 'fb-sandhya',
            name: "Sandhya Thagunna",
            role: "Senior Recruitment Officer",
            bio:
                "<p>Experienced Senior Recruitment Officer with expertise in end-to-end recruitment, talent acquisition, candidate sourcing, interviewing, employee onboarding, and workforce planning.</p>",
            image_url: cfo,
        },
    ],
}

export default aboutFallback
