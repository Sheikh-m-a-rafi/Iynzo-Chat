export function formatTime(isoString?: string | null): string {
    if (!isoString) return "";

    const date = new Date(isoString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (60000));
    const diffInHours = Math.floor(diffInMs / (3600000));
    const diffInDays = Math.floor(diffInMs / (86400000));

    if (diffInMinutes < 1) {
        return "Just now";
    }
    if(diffInHours < 1) {
        return `${diffInMinutes} min ago`;
    }
    if(diffInDays < 1) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    }
    if(diffInDays === 1) {
    return "yesterday"
    }
    if(diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}