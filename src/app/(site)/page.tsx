"use client"
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import TitleSection from "@/components/landing-page/title-section";
import FeatureSection from "@/components/landing-page/feature-section";
import { Button } from "@/components/ui/button";
import Banner from "../../../public/banner/Cover (2).png";
import { useTheme } from "next-themes";
import Calender_D from "../../../public/featureLogo/darkMode/CalendarCalenderDark.png";
import Ai_D from "../../../public/featureLogo/darkMode/Edit 1.png";
import Publish_D from "../../../public/featureLogo/darkMode/Link 2.png";
import Meeting_D from "../../../public/featureLogo/darkMode/Users.png";
import Calender_L from "../../../public/featureLogo/lightMode/Calendar.png";
import Ai_L from "../../../public/featureLogo/lightMode/Edit 1.png";
import Publish_L from "../../../public/featureLogo/lightMode/Link 2.png";
import Meeting_L from "../../../public/featureLogo/lightMode/Users.png";
import Image from "next/image";
export default function Home() {
  const { theme,setTheme } = useTheme();
  // setTheme('dar')
  console.log(theme)
  const Calender = theme == "light" ? Calender_L : Calender_D;
  const Ai = theme =="light" ? Ai_L : Ai_D;
  const Publish = theme == "light" ? Publish_L : Publish_D;
  const Meeting = theme =="light" ? Meeting_L : Meeting_D;
  
  return (
    <section>
      <div className=" overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <div className="sm:w-3/5">
          <TitleSection
            pill="✨Your workspace perfected"
            title="All-In-One collaboration and productivity platform"
            subheading="Where Teamwork Gets Zen"
          />
        </div>
        <div
          className="bg-white p-[2px] 
        mt-6
        rounded-xl 
        bg-gradient-to-r
        from-primary-purple/primary-purple-100
        to-brand/brand-primaryBlue
        sm:w-[300px]"
        >
          <Button
            variant="secondary"
            className="w-full rounded-[10px] p-6 text-2xl bg-background"
          >
            Get ZenSync Free
          </Button>
        </div>
        <div className="w-[40%]
        blur-[100px]
        rounded-full
        h-44
        absolute
        bg-brand/brand-PrimaryPurple
        -z-10
        top-96
        left-11"/>
        <div
          className="sm:flex sm:flex-wrap justify-center sm:gap-5 w-full
        "
        >
          <FeatureSection
            logo={Calender}
            heading="RealTime colab"
            description="Connect with people and work on a same Doc Realtime"
          />
          <FeatureSection
            logo={Ai}
            heading="Publish Docs"
            description="Publish your works Online"
          />
          <FeatureSection
            logo={Publish}
            heading="Ai Text completion"
            description="complete your paragraph with the help of Ai"
          />
          <FeatureSection
            logo={Meeting}
            heading="Meeting Room"
            description="Real Time meeting Room with shared white board"
          />
        </div>
        <div
          className="
          mt-5
        sm:w-full
        w-[750px]
        flex
        justify-center
        items-center
        relative
        sm:ml-0
        ml-[-50]"
        >
          <Image src={Banner} width={"1000"} alt="App banner"></Image>
          <div
            className="bottom-0
          top-[40%]
          bg-gradient-to-t
          dark:from-background
          left-0
          right-0
          absolute
          "
          ></div>
        </div>
      </div>
    </section>
  );
}
