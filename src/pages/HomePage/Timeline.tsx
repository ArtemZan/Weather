export default function Timeline({ date, interval }: { date: Date[], interval: number }) {
    let day = -1;
    let res = []

    for (let d = 0; d < date.length; d++) {
        if (date[d].getDay() !== day) {
            day = date[d].getDay()
            res.push({ day, date: date[d].getDate(), hours: [] })
        }

        res[res.length - 1].hours.push(date[d].getHours())
    }

    const daysNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

    res = res.map(({ day, date, hours }, index) => <div className="day" key={index}>
        <header>
            {daysNames[day]}
            {" "}
            {date}
        </header>

        <div className="hours">
            {hours.map((hour, index) => <div key={index}>{hour}</div>)}
        </div>
    </div>)

    return <div data-interval={interval} className="timeline">
        {res}
    </div>
}