export function getBookTime ()  {
    let allTimes = [];
    const startTime = new Date();
    startTime.setHours(10, 0, 0, 0);
    for (let i = 0; i < 12; i++) {
        const time = new Date(startTime.getTime() + i * 45 * 60 * 1000);
        const formattedTime = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
        allTimes.push(formattedTime);
    }
    return allTimes
}