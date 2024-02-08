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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeatureSection: React.FC<FeatureSectionProps> = ({logo,heading,description}) => {
  return (
    <>
      <section className="mt-5">
        <Card className=" sm:w-64 sm:h-52">
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
