import Link from "next/link";
import Image from "next/image";

const NotFound: React.FC = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className=" w-full xl:w-1/2 h-full relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute z-50">
            <div className="">
              <h1 className="my-2 text-gray-800 dark:text-gray-100 font-bold text-2xl">
                Looks like you&apos;ve found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800 dark:text-gray-300">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link href="/">
                <button className="cursor-pointer rounded-xl sm:w-full lg:w-auto my-2 border md py-4 px-8 text-center bg-indigo-600 dark:bg-indigo-400 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 dark:focus:ring-indigo-500 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              className="dark:opacity-5"
              src="https://i.ibb.co/G9DC8S0/404-2.png"
              alt="404 Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          className="dark:opacity-90"
          src="https://i.ibb.co/ck1SGFJ/Group.png"
          alt="Group Image"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default NotFound;
