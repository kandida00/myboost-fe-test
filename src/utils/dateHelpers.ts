export function formatDate(isoString: string): string {
    try {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        // Format: "January 15, 2024"
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
}

export function formatDateShort(isoString: string): string {
    try {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        // Format: "Jan 15, 2024"
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
}

export function getRelativeTime(isoString: string): string {
    try {
        const date = new Date(isoString);
        const now = new Date();

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
        }

        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    } catch (error) {
        console.error('Error getting relative time:', error);
        return 'Invalid date';
    }
}

export function formatDateTime(isoString: string): string {
    try {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        // Format: "January 15, 2024 at 3:45 PM"
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    } catch (error) {
        console.error('Error formatting date time:', error);
        return 'Invalid date';
    }
}