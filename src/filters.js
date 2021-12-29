export default {
    dateFormat(d) {
        const x = new Date(d);
        const today = new Date();
        const xDate = x.getDate();
        const todayDate = today.getDate();
        today.setDate(today.getDate() + 1);
        const tomorrowDate = today.getDate();
        const hour = x.getHours().toString().padStart(2, '0');
        const minutes = x.getMinutes().toString().padStart(2, '0');
        const time = `${hour}.${minutes}`;

        if (xDate === todayDate) {
            return `Today, ${time}`;
        }

        if (xDate === tomorrowDate) {
            return `Tomorrow, ${time}`;
        }

        const months = "Jan Feb March Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
        const month = months[x.getMonth()];
        return `${todayDate} ${month}, ${time}`;
    }
}