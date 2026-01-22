import { getDayRange, getTodayDay } from "./daycalculation.js";
import Path from '../../models/path.model.js';
import User from '../../models/user.model.js';
import sendMail from '../email-notification/sendEmail.js';



export default async function planNotification() {

    const paths: any = await Path.find({});

    for (const path of paths) {

        const currentDay = getTodayDay(path.startDate);
        for (const item of path.learningPath) {

            const { startDate, endDate } = getDayRange(item.day);
            if (startDate <= currentDay && currentDay <= endDate && !item.reminderSent.includes(currentDay)) {

                const user = await User.findById(path.userId);
                const msg = { day: currentDay, heading: item.heading };
                await sendMail(user?.email as string, msg);

                item.reminderSent.push(currentDay);
                await path.save()
                break;
            }
        }
    }
}
export async function firstDayNotification(path:any) {

    const currentDay = getTodayDay(path.startDate);
    for (const item of path.learningPath) {

        const user = await User.findById(path.userId);
        const msg = { day: currentDay, heading: item.heading };
        await sendMail(user?.email as string, msg);

        item.reminderSent.push(currentDay);
        await path.save()
        break;

    }

}