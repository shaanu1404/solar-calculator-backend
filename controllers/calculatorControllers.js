import moment from "moment";
import { db } from "../config/database.js";
import { calculateValidationSchema } from "./validations.js";
import { calculate } from "./services.js";

const shouldCreateDBEntry = (enquiry) => {
  if (!enquiry) return true;
  const date = moment(enquiry.createdAt);
  const diff = moment().diff(date, "days");
  return diff > 1;
};

export const calculateSolarBill = async (req, res) => {
  try {
    const { area, avgMonthBill, phone } =
      await calculateValidationSchema.validate(req.body);
    const result = calculate(avgMonthBill);

    const enquiry = await db.enquiry.findFirst({
      where: {
        phone,
        area,
        avgMonthlyBill: avgMonthBill,
      },
      orderBy: { createdAt: "desc" },
      take: 1,
    });

    if (shouldCreateDBEntry(enquiry)) {
      await db.enquiry.create({
        data: {
          phone,
          area,
          avgMonthlyBill: avgMonthBill,
        },
      });
    }

    return res.status(200).json({ phone, avgMonthBill, area, result });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(enquiries);
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};
