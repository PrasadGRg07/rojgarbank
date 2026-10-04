import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Calendar, User, Tag } from "lucide-react";
import { fetchNotifications, markNotificationAsRead } from "../../../lib/notificationApi";

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotification = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        const n = data.find((item) => item.id === Number(id));
        if (n) {
          const dateObj = new Date(n.created_at);
          setNotification({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.notification_type,
            user: "System",
            status: n.is_read ? "Read" : "Unread",
            date: dateObj.toLocaleDateString(),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          if (!n.is_read) {
            await markNotificationAsRead(n.id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadNotification();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center dark:bg-slate-900">
        Loading...
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center dark:bg-slate-900">
        Notification not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Notification Details
          </h1>

          <p className="text-sm text-slate-500">
            View notification information.
          </p>
        </div>
      </div>

      {/* Details Card */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3">
            <Bell className="text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {notification.title}
            </h2>

            <span className="text-sm text-slate-500">
              {notification.status}
            </span>
          </div>
        </div>

        <p className="mt-6 text-slate-600 dark:text-slate-300">
          {notification.message}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <User size={20} />

            <div>
              <p className="text-xs text-slate-500">User</p>

              <p className="font-medium">{notification.user}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <Tag size={20} />

            <div>
              <p className="text-xs text-slate-500">Type</p>

              <p className="font-medium">{notification.type}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <Calendar size={20} />

            <div>
              <p className="text-xs text-slate-500">Date</p>

              <p className="font-medium">{notification.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
