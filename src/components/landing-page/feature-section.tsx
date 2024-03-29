import { StaticImageData } from "next/image";
import React from "react";
interface FeatureSectionProps {
  logo: StaticImageData;
  heading: string;
  description: string;
}
import Image  from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeatureSection: React.FC<FeatureSectionProps> = ({logo,heading,description}) => {
  return (
    <>
      <section className="mt-5">
        <Card className=" sm:w-56 sm:h-52 rounded-xl bg-brand/brand-Dark/5 backdrop-blur-xl">
          <CardHeader>
            <Image src={logo} alt="featureLogo" width={30} />
            <CardTitle>{heading}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default FeatureSection;
