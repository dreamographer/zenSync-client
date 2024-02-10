import React from "react";
interface TitleSectionProps {
  title: string;
  subheading?: string;
  pill: string;
}
const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subheading,
  pill,
}) => {
  return (
    <>
      <section
        className="flex 
        flex-col 
        gap-4
        justify-center
        items-start
        md:items-center"
      >
        <article
          className="rounded-full
            p-[1px]
            text-sm
            bg-gradient-to-r
            from-brand/brand-primaryBlue
            to-brand/brand-PrimaryPurple"
        >
          <div
            className="rounded-full
            px-3
            py-1
            bg-Washed-purple/washed-purple-50     
            dark:bg-black
            dark:text-Washed-purple/washed-purple-50"
            
          >
            {pill}
          </div>
        </article>
        {subheading ? (
          <>
            <h2
              className="text-left
            text-3xl
            sm:text-7xl
            md:text-center
            font-black"
            >
              {title}
            </h2>
            <p
              className="dark:text-Washed-purple/washed-purple-50
            sm:max-w-[450px]
            md:text-center
            text-xl font-semibold"
            >
              {subheading}
            </p>
          </>
        ) : (
          <h1
            className="text-left
        text-4xl
        sm:text-6xl
        sm:max-w-[850px]
        md:text-center
        font-bold"
          >
            {" "}
            {title}
          </h1>
        )}
      </section>
    </>
  );
};

export default TitleSection;
