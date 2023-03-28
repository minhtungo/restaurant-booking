import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import Spinner from "@/components/Spinner";
import Menu from "@/components/Menu";

interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}

const Home: NextPage = () => {
  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if (date.dateTime) {
      checkMenuStatus();
    }
  }, [date]);

  const { mutate: checkMenuStatus, isSuccess } =
    api.menu.checkMenuStatus.useMutation();

  const addToCart = (id: string, quantity: number) => {
    console.log("add to cart");
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!date.dateTime && <Calendar setDate={setDate} date={date} />}
        {date.dateTime && isSuccess ? (
          <Menu selectedTime={date.dateTime} addToCart={addToCart} />
        ) : (
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
