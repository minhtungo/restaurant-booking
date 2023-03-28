import { type CATEGORIES } from "@/constants/config";

interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}

type Categories = (typeof CATEGORIES)[number];
