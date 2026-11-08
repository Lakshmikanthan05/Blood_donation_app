import cron from "node-cron";
import { Donor } from "../model/Donor.js";

const isEligibleToDonate = (lastDonateDate) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return lastDonateDate <= threeMonthsAgo;
};

cron.schedule("0 0 * * *", async () => {
  const donors = await Donor.find({ isEligible: false });

  for (const donor of donors) {
    if (isEligibleToDonate(donor.lastdonate)) {
      donor.isEligible = true;
      await donor.save();
      console.log(`Donor ${donor._id} is now eligible again.`);
    }
  }
});

console.log("Donor eligibility cron job scheduled.");
