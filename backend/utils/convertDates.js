const formatDateShort = (isoDate) => {
    const date = new Date(isoDate);

    // Get components of the date
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Nov"
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12; // Convert "0" to "12"
    const ampm = hours >= 12 ? "PM" : "AM";

    // Format the minutes to always have two digits
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Combine into a single string
    return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
};

export default formatDateShort;
