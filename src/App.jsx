import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Public Pages
import Home from "./components/Home";
//import Login from "./components/Login";
//import Register from "./components/Register";
import Contact from "./components/Contact";
import Aboutus from "./components/Aboutus";
import Blogs from "./components/Blogs";
import Blogsdetails from "./components/Blogsdetails";
import Training from "./components/Training";
import Events from "./components/Events";
import PublicJobDetails from "./components/PublicJobDetails";
import OTPVerify from "./panels/OTPVerify";
import { GoogleOAuthProvider } from "@react-oauth/google";
// Employee
import Dashboard from "./panels/employee/Dashboard";
import DashboardContent from "./panels/employee/DashboardContent";
import MyProfile from "./panels/employee/MyProfile";

import EmployeeLogin from "./panels/employee/Login";
import EmployeeRegister from "./panels/employee/Register";
import ForgotPassword from "./panels/employee/ForgotPassword";

import Settings from "./panels/employee/Settings";
import ProfileSettings from "./panels/employee/Settings/ProfileSettings";
import UpdateProfile from "./panels/employee/Settings/UpdateProfile";
import ChangePasswordSetting from "./panels/employee/Settings/ChangePasswordSetting";

import SearchCandidate from "./panels/employee/Resumesearch/SearchCandidate";
import CandidateProfile from "./panels/employee/Resumesearch/CandidateProfile";
import SavedCandidates from "./panels/employee/Resumesearch/SavedCandidates";

import JobList from "./panels/employee/Job/JobList";
import CreateJob from "./panels/employee/Job/CreateJob";
import JobPreview from "./panels/employee/Job/components/JobPreview";
import EditJob from "./panels/employee/Job/EditJob";

import Applicants from "./panels/employee/Job/Applicants";
import JobDetail from "./panels/employee/Job/JobDetails";
import ApplicantDetails from "./panels/employee/Job/ApplicantDetails";

import Subscription from "./panels/employee/subscription/Subscription";

import Pipeline from "./panels/employee/ats/Pipeline";
import Interviews from "./panels/employee/ats/Interviews";

//message employee
import EmployeeChat from "./panels/employee/Messages/Chat";
import EmployeeInbox from "./panels/employee/Messages/Inbox";
import EmployeeSentMessages from "./panels/employee/Messages/SentMessages";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// ================= ADMIN =================

import AdminDashboard from "./panels/admin/Dashboard";
import AdminDashboardContent from "./panels/admin/DashboardContent";
import AdminLogin from "./panels/admin/AdminLogin";
//===========admin user crud=================
import UserDetail from "./panels/admin/Users/UserDetail";
import UserList from "./panels/admin/Users/UserList";
import UserEdit from "./panels/admin/Users/UserEdit";
import UserCreate from "./panels/admin/Users/UserCreate";
//==========admin employee crud=================
import EmployerList from "./panels/admin/Employers/EmployerList";
import EmployerReview from "./panels/admin/Employers/EmployerReview";
//============admin blogs=============
import BlogList from "./panels/admin/Blogs/BlogList";
import BlogDetail from "./panels/admin/Blogs/BlogDetail";
import CreateBlog from "./panels/admin/Blogs/CreateBlog";
import EditBlog from "./panels/admin/Blogs/EditBlog";
//// adminn events =======
import EventList from "./panels/admin/Events/EventList";
import CreateEvent from "./panels/admin/Events/CreateEvent";
import EventDetail from "./panels/admin/Events/EventDetail";
import EditEvent from "./panels/admin/Events/EditEvent";
import EventParticipants from "./panels/admin/Events/EventParticipants";
// admin trainning
import TrainingList from "./panels/admin/Training/TrainingList";
import CreateTraining from "./panels/admin/Training/CreateTraining";
import TrainingDetail from "./panels/admin/Training/TrainingDetail";
import EditTraining from "./panels/admin/Training/EditTraining";
import TrainingEnrollment from "./panels/admin/Training/TrainingEnrollment";

// admin job=---
import AdminJobList from "./panels/admin/Jobs/JobList";
import AdminJobReview from "./panels/admin/Jobs/JobReview";

import AdminAnalytics from "./panels/admin/Analytics/Analytics";
import DashboardAnalytics from "./panels/admin/Analytics/DashboardAnalytics";
import UserAnalytics from "./panels/admin/Analytics/UserAnalytics";
import EmployerAnalytics from "./panels/admin/Analytics/EmployerAnalytics";
import JobAnalytics from "./panels/admin/Analytics/JobAnalytics";
import ApplicationAnalytics from "./panels/admin/Analytics/ApplicationAnalytics";
import AdminBlogAnalytics from "./panels/admin/Analytics/BlogAnalytics";
import EventAnalytics from "./panels/admin/Analytics/EventAnalytics";
import TrafficAnalytics from "./panels/admin/Analytics/TrafficAnalytics";
//settings
import AdminSettings from "./panels/admin/Settings/Settings";

import AdminGeneralSettings from "./panels/admin/Settings/GeneralSettings";
import AdminSecuritySettings from "./panels/admin/Settings/SecuritySettings";
import AdminSystemSettings from "./panels/admin/Settings/SystemSettings";
import AdminBackupSettings from "./panels/admin/Settings/BackupSettings";
import AdminEmailSettings from "./panels/admin/Settings/EmailSettings";
import AdminSMTPSettings from "./panels/admin/Settings/SMTPSettings";
import AdminSocialSettings from "./panels/admin/Settings/SocialSettings";
//message
import AdminMessageDashboard from "./panels/admin/Messages/MessageDashboard";

import AdminInbox from "./panels/admin/Messages/Inbox";
import AdminSentMessages from "./panels/admin/Messages/SentMessages";
import AdminArchivedMessages from "./panels/admin/Messages/ArchivedMessages";
import AdminComposeMessage from "./panels/admin/Messages/ComposeMessage";

import AdminMessageDetail from "./panels/admin/Messages/MessageDetail";
import AdminReplyMessage from "./panels/admin/Messages/ReplyMessage";
// admin audit
import ActivityLogs from "./panels/admin/Audit/ActivityLogs";
import LoginHistory from "./panels/admin/Audit/LoginHistory";
import SecurityLogs from "./panels/admin/Audit/SecurityLogs";
import SystemLogs from "./panels/admin/Audit/SystemLogs";

import AuditLayout from "./panels/admin/Audit/AuditLayout";
import AuditDashboard from "./panels/admin/Audit/AuditDashboard";

//admin report
import ReportsLayout from "./panels/admin/Reports/ReportsLayout";
import ReportsDashboard from "./panels/admin/Reports/ReportsDashboard";

import UserReport from "./panels/admin/Reports/UserReport";
import EmployerReport from "./panels/admin/Reports/EmployerReport";
import JobReport from "./panels/admin/Reports/JobReport";
import ApplicationReport from "./panels/admin/Reports/ApplicationReport";
import BlogReport from "./panels/admin/Reports/BlogReport";
import EventReport from "./panels/admin/Reports/EventReport";
import TrainingReport from "./panels/admin/Reports/TrainingReport";
import ExportReport from "./panels/admin/Reports/ExportReport";
// admin applications
import ApplicationDashboard from "./panels/admin/Applications/ApplicationDashboard";

import ApplicationList from "./panels/admin/Applications/ApplicationList";
import PendingApplications from "./panels/admin/Applications/PendingApplications";
import ShortlistedApplications from "./panels/admin/Applications/ShortlistedApplications";
import HiredApplications from "./panels/admin/Applications/HiredApplications";
import RejectedApplications from "./panels/admin/Applications/RejectedApplications";

import ApplicationDetail from "./panels/admin/Applications/ApplicationDetail";
import ResumeViewer from "./panels/admin/Applications/ResumeViewer";
import ApplicationStatistics from "./panels/admin/Applications/ApplicationStatistics";
import AdminSubscriptionList from "./panels/admin/Subscriptions/SubscriptionList";
// admin notifications
import NotificationDashboard from "./panels/admin/Notifications/NotificationDashboard";

import AllNotifications from "./panels/admin/Notifications/AllNotifications";
import UnreadNotifications from "./panels/admin/Notifications/UnreadNotifications";
import SystemNotifications from "./panels/admin/Notifications/SystemNotifications";
import UserNotifications from "./panels/admin/Notifications/UserNotifications";
import JobNotifications from "./panels/admin/Notifications/JobNotifications";

import NotificationDetail from "./panels/admin/Notifications/NotificationDetail";
// ==============jobseeker======
import JobSeekerLogin from "./panels/jobseeker/Login";
import JobSeekerRegister from "./panels/jobseeker/Register";
import JobSeekerDashboard from "./panels/jobseeker/Dashboard";
import JobSeekerDashboardContent from "./panels/jobseeker/DashboardContent";
//job seeker profile part
import Profile from "./panels/jobseeker/Profile/Profile";
import CompanyProfile from "./panels/jobseeker/Profile/CompanyProfile";
import EditProfile from "./panels/jobseeker/Profile/EditProfile";
import Resume from "./panels/jobseeker/Profile/Resume";
import Skills from "./panels/jobseeker/Profile/Skills";
import Education from "./panels/jobseeker/Profile/Education";
import Experience from "./panels/jobseeker/Profile/Experience";
import Certifications from "./panels/jobseeker/Profile/Certifications";
import Portfolio from "./panels/jobseeker/Profile/Portfolio";
///job seeker jobs part ===========
import SearchJobs from "./panels/jobseeker/Jobs/SearchJobs";
import JobDetails from "./panels/jobseeker/Jobs/JobDetails";
import RecommendedJobs from "./panels/jobseeker/Jobs/RecommendedJobs";
import SavedJobs from "./panels/jobseeker/Jobs/SavedJobs";

//// jobseeker appplication parts
import AppliedJobs from "./panels/jobseeker/Applications/AppliedJobs";
import ApplicationHistory from "./panels/jobseeker/Applications/ApplicationHistory";
import ApplicationDetails from "./panels/jobseeker/Applications/ApplicationDetails";

///jobseeker message parts

import Chat from "./panels/jobseeker/Messages/Chat";
import Inbox from "./panels/jobseeker/Messages/Inbox";
import SentMessages from "./panels/jobseeker/Messages/SentMessages";

//import ChatBubble from "./panels/jobseeker/components/ChatBubble";
//import ChatHeader from "./panels/jobseeker/components/ChatHeader";
//import EmptyChat from "./panels/jobseeker/components/EmptyChat";
//import MessageCard from "./panels/jobseeker/components/MessageCard";
//import MessageInput from "./panels/jobseeker/components/MessageInput";

// job seeker notification
//import NotificationCard from "./panels/jobseeker/components/NotificationCard";
import NotificationList from "./panels/jobseeker/Notifications/NotificationList";

// jobseaker settings
import AccountSettings from "./panels/jobseeker/Settings/AccountSettings";
import ChangePassword from "./panels/jobseeker/Settings/ChangePassword";
import JobSettings from "./panels/jobseeker/Settings/Settings";
import PrivacySettings from "./panels/jobseeker/Settings/PrivacySettings";
import NotificationSettings from "./panels/jobseeker/Settings/NotificationSettings";

// ================= SUPER ADMIN =================

import SuperAdminDashboard from "./panels/superadmin/Dashboard";
import SuperAdminDashboardContent from "./panels/superadmin/DashboardContent";

import AdminList from "./panels/superadmin/admins/AdminList";
import CreateAdmin from "./panels/superadmin/admins/CreateAdmin";
import EditAdmin from "./panels/superadmin/admins/EditAdmin";
import DeleteAdmin from "./panels/superadmin/admins/DeleteAdmin";

import Analytics from "./panels/superadmin/analytics/Analytics";
import BackupDatabase from "./panels/superadmin/backup/BackupDatabase";
import AuditLogs from "./panels/superadmin/logs/AuditLogs";
import SuperAdminProfile from "./panels/superadmin/profile/Profile";
import Roles from "./panels/superadmin/roles/Roles";
import Permissions from "./panels/superadmin/roles/Permissions";
import SystemSettings from "./panels/superadmin/settings/SystemSettings";
import SuperAdminLogin from "./panels/superadmin/SuperAdminLogin";
import SubscriptionApproval from "./panels/superadmin/subscriptions/SubscriptionApproval";
import SpecialAccounts from "./panels/superadmin/specialAccounts/SpecialAccounts";

const appRouter = createBrowserRouter([
  // ================= PUBLIC =================

  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <Aboutus />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blogs/:slug",
    element: <Blogsdetails />,
  },
  {
    path: "/training",
    element: <Training />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/jobs/:id",
    element: <PublicJobDetails />,
  },
  {
    path: "/verify-otp",
    element: <OTPVerify />,
  },

  // ================= SUPER ADMIN =================

  {
    path: "/superadmin/login",
    element: <SuperAdminLogin />,
  },

  {
    path: "/superadmin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <SuperAdminDashboardContent />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionApproval />,
      },
      {
        path: "admins",
        element: <AdminList />,
      },

      {
        path: "admins/create",
        element: <CreateAdmin />,
      },

      {
        path: "admins/edit/:id",
        element: <EditAdmin />,
      },

      {
        path: "admins/delete/:id",
        element: <DeleteAdmin />,
      },

      {
        path: "analytics",
        element: <Analytics />,
      },

      {
        path: "backup",
        element: <BackupDatabase />,
      },

      {
        path: "audit-logs",
        element: <AuditLogs />,
      },

      {
        path: "profile",
        element: <SuperAdminProfile />,
      },

      {
        path: "roles",
        element: <Roles />,
      },

      {
        path: "permissions",
        element: <Permissions />,
      },
      
      {
        path: "special-accounts",
        element: <SpecialAccounts />,
      },

      {
        path: "settings",
        element: <SystemSettings />,
      },
    ],
  },

  // ================= EMPLOYEE =================

  {
    path: "/employee/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["employee"]}>
        <Dashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },

      {
        index: true,
        element: <DashboardContent />,
      },

      {
        path: "search-candidates",
        element: <SearchCandidate />,
      },
      {
        path: "saved-candidates",
        element: <SavedCandidates />,
      },
      {
        path: "candidates/:id",
        element: <CandidateProfile />,
      },
      {
        path: "resume-search/:id",
        element: <CandidateProfile />,
      },


      {
        path: "jobs",
        element: <JobList />,
      },

      {
        path: "jobs/create",
        element: <CreateJob />,
      },
      {
        path: "jobs/preview",
        element: <JobPreview />,
      },
      {
        path: "jobs/edit/:id",
        element: <EditJob />,
      },
      {
        path: "jobs/:id",
        element: <JobDetail />,
      },
      {
        path: "jobs/applicants/:id",
        element: <Applicants />,
      },
      {
        path: "applications/:id",
        element: <ApplicantDetails />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "ats/pipeline",
        element: <Pipeline />,
      },
      {
        path: "ats/interviews",
        element: <Interviews />,
      },

      {
        path: "settings",
        element: <Settings />,

        children: [
          {
            index: true,
            element: <ProfileSettings />,
          },
          {
            path: "update-profile",
            element: <UpdateProfile />,
          },
          {
            path: "change-password",
            element: <ChangePasswordSetting />,
          },
        ],
      },
      // message
      {
        path: "messages",
        children: [
          {
            path: "inbox",
            element: <EmployeeInbox />,
          },
          {
            path: "chat/:id",
            element: <EmployeeChat />,
          },
          {
            path: "sent-message",
            element: <EmployeeSentMessages />,
          },
        ],
      },
    ],
  },

  {
    path: "/employee/login",
    element: <EmployeeLogin />,
  },

  {
    path: "/employee/register",
    element: <EmployeeRegister />,
  },

  {
    path: "/employee/settings",
    element: <Navigate to="/employee/dashboard/settings" replace />,
  },

  {
    path: "/employee/forgot-password",
    element: <ForgotPassword />,
  },

  // ================= ADMIN =================
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardContent />,
      },
      {
        path: "subscriptions",
        element: <AdminSubscriptionList />,
      },
      {
        path: "notifications",
        children: [
          {
            index: true,
            element: <NotificationDashboard />,
          },

          {
            path: "all",
            element: <AllNotifications />,
          },

          {
            path: "unread",
            element: <UnreadNotifications />,
          },

          {
            path: "system",
            element: <SystemNotifications />,
          },

          {
            path: "users",
            element: <UserNotifications />,
          },

          {
            path: "jobs",
            element: <JobNotifications />,
          },

          {
            path: ":id",
            element: <NotificationDetail />,
          },
        ],
      },
      //settings
      {
        path: "settings",
        children: [
          {
            index: true,
            element: <AdminSettings />,
          },

          {
            path: "general",
            element: <AdminGeneralSettings />,
          },

          {
            path: "security",
            element: <AdminSecuritySettings />,
          },

          {
            path: "system",
            element: <AdminSystemSettings />,
          },

          {
            path: "backup",
            element: <AdminBackupSettings />,
          },

          {
            path: "email",
            element: <AdminEmailSettings />,
          },

          {
            path: "smtp",
            element: <AdminSMTPSettings />,
          },

          {
            path: "social",
            element: <AdminSocialSettings />,
          },
        ],
      },
      //message
      {
        path: "messages",
        children: [
          {
            index: true,
            element: <AdminMessageDashboard />,
          },

          {
            path: "inbox",
            element: <AdminInbox />,
          },

          {
            path: "sent",
            element: <AdminSentMessages />,
          },

          {
            path: "archive",
            element: <AdminArchivedMessages />,
          },

          {
            path: "compose",
            element: <AdminComposeMessage />,
          },

          {
            path: ":id",
            element: <AdminMessageDetail />,
          },

          {
            path: ":id/reply",
            element: <AdminReplyMessage />,
          },
        ],
      },
      // Employers
      {
        path: "employers",
        element: <EmployerList />,
      },

      {
        path: "employers/:id",
        element: <EmployerReview />,
      },

      // Users
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/create",
        element: <UserCreate />,
      },
      {
        path: "users/:id",
        element: <UserDetail />,
      },
      {
        path: "users/edit/:id",
        element: <UserEdit />,
      },
      // Blogs
      {
        path: "blogs",
        element: <BlogList />,
      },
      {
        path: "blogs/create",
        element: <CreateBlog />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetail />,
      },
      {
        path: "blogs/edit/:id",
        element: <EditBlog />,
      },
      //events
      {
        path: "events",
        element: <EventList />,
      },

      {
        path: "events/create",
        element: <CreateEvent />,
      },

      {
        path: "events/:id",
        element: <EventDetail />,
      },

      {
        path: "events/edit/:id",
        element: <EditEvent />,
      },

      {
        path: "events/participants",
        element: <EventParticipants />,
      },
      //trainning
      {
        path: "training",
        element: <TrainingList />,
      },

      {
        path: "training/create",
        element: <CreateTraining />,
      },

      {
        path: "training/:id",
        element: <TrainingDetail />,
      },

      {
        path: "training/edit/:id",
        element: <EditTraining />,
      },

      {
        path: "training/:id/enrollments",
        element: <TrainingEnrollment />,
      },
      //jobs
      {
        path: "jobs",
        element: <AdminJobList />,
      },

      {
        path: "jobs/review/:id",
        element: <AdminJobReview />,
      },

      //===== Analytics

      {
        path: "analytics",
        children: [
          {
            index: true,
            element: <AdminAnalytics />,
          },

          {
            path: "dashboard",
            element: <DashboardAnalytics />,
          },
          {
            path: "users",
            element: <UserAnalytics />,
          },
          {
            path: "employers",
            element: <EmployerAnalytics />,
          },
          {
            path: "jobs",
            element: <JobAnalytics />,
          },
          {
            path: "applications",
            element: <ApplicationAnalytics />,
          },
          {
            path: "blogs",
            element: <AdminBlogAnalytics />,
          },
          {
            path: "events",
            element: <EventAnalytics />,
          },
          {
            path: "traffic",
            element: <TrafficAnalytics />,
          },
        ],
      },
      // ================= AUDIT =================

      {
        path: "audit",
        element: <AuditLayout />,
        children: [
          {
            index: true,
            element: <AuditDashboard />,
          },
          {
            path: "activity",
            element: <ActivityLogs />,
          },
          {
            path: "login-history",
            element: <LoginHistory />,
          },
          {
            path: "security",
            element: <SecurityLogs />,
          },
          {
            path: "system",
            element: <SystemLogs />,
          },
        ],
      },
      /// admin report
      {
        path: "reports",
        element: <ReportsLayout />,
        children: [
          {
            index: true,
            element: <ReportsDashboard />,
          },
          {
            path: "users",
            element: <UserReport />,
          },
          {
            path: "employers",
            element: <EmployerReport />,
          },
          {
            path: "jobs",
            element: <JobReport />,
          },
          {
            path: "applications",
            element: <ApplicationReport />,
          },
          {
            path: "blogs",
            element: <BlogReport />,
          },
          {
            path: "events",
            element: <EventReport />,
          },
          {
            path: "training",
            element: <TrainingReport />,
          },
          {
            path: "export",
            element: <ExportReport />,
          },
        ],
      },
      /// admin applications
      {
        path: "applications",
        children: [
          {
            index: true,
            element: <ApplicationDashboard />,
          },

          {
            path: "list",
            element: <ApplicationList />,
          },

          {
            path: "pending",
            element: <PendingApplications />,
          },

          {
            path: "shortlisted",
            element: <ShortlistedApplications />,
          },

          {
            path: "hired",
            element: <HiredApplications />,
          },

          {
            path: "rejected",
            element: <RejectedApplications />,
          },

          {
            path: "statistics",
            element: <ApplicationStatistics />,
          },

          {
            path: ":id",
            element: <ApplicationDetail />,
          },

          {
            path: ":id/resume",
            element: <ResumeViewer />,
          },
        ],
      },
    ],
  },
  // ======jobseeker====

  {
    path: "/jobseeker/login",
    element: <JobSeekerLogin />,
  },

  {
    path: "/jobseeker/register",
    element: <JobSeekerRegister />,
  },
  {
    path: "/jobseeker/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["jobseeker"]}>
        <JobSeekerDashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <JobSeekerDashboardContent />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
      {
        path: "profile/resume",
        element: <Resume />,
      },
      {
        path: "profile/skills",
        element: <Skills />,
      },
      {
        path: "profile/education",
        element: <Education />,
      },
      {
        path: "profile/experience",
        element: <Experience />,
      },
      {
        path: "profile/certifications",
        element: <Certifications />,
      },
      {
        path: "profile/portfolio",
        element: <Portfolio />,
      },
      {
        path: "company/:id",
        element: <CompanyProfile />,
      },
      // Jobs Routes
      {
        path: "jobs/search",
        element: <SearchJobs />,
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "jobs/recommended-jobs",
        element: <RecommendedJobs />,
      },
      {
        path: "jobs/saved-jobs",
        element: <SavedJobs />,
      },

      //applications
      {
        path: "applications",
        element: <AppliedJobs />,
      },
      {
        path: "applications/history",
        element: <ApplicationHistory />,
      },
      {
        path: "applications/:id",
        element: <ApplicationDetails />,
      },
      // message
      {
        path: "messages",
        children: [
          {
            path: "inbox",
            element: <Inbox />,
          },
          {
            path: "chat/:id",
            element: <Chat />,
          },
          {
            path: "sent-message",
            element: <SentMessages />,
          },
        ],
      },
      // notification
      {
        path: "notifications",
        element: <NotificationList />,
      },
      // setting
      {
        path: "job-settings",
        element: <JobSettings />,

        children: [
          {
            index: true,
            element: <AccountSettings />,
          },

          {
            path: "account",
            element: <AccountSettings />,
          },

          {
            path: "change-password",
            element: <ChangePassword />,
          },

          {
            path: "privacy",
            element: <PrivacySettings />,
          },

          {
            path: "notifications",
            element: <NotificationSettings />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <RouterProvider
          router={appRouter}
          future={{ v7_startTransition: true }}
        />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
