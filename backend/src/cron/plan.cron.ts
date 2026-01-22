import cron from 'node-cron';
import planNotification from '../service/email-notification/planNotification.js';

export function startCron() {

  try {
    cron.schedule("0 9 * * *", () => {
      planNotification();
    })
  }
  catch (e) {
    const msg = (e instanceof Error) ? e.message : "unknow Error";
    console.log(msg);
  }
}

