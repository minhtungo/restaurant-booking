import Calendar from "@/components/Calendar";
import { prisma } from "@/server/db";
import { formatISO } from "date-fns";
import { type NextPage } from "next";
import Head from "next/head";

interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}

interface HomeProps {
  days: Day[];
  closedDays: string[]; // as ISO string
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
  return (
    <>
      <Head>
        <title>Booking Software</title>
        <meta name="description" content="by josh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calendar days={days} closedDays={closedDays} />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();
  const closedDays = (await prisma.closedDay.findMany()).map((d) =>
    formatISO(d.date)
  );
  return { props: { days, closedDays } };
}

export default Home;
