import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";


function Main() {
  return (
    <>
    <div className="w-full h-auto flex flex-col md:flex-row md:relative px-6 md:px-0 sm:mt-5 mt-2 md:mt-4 xl:mt-0">
      {/* Left Section */}
      <div className="w-full md:w-[70%] xl:w-[65%] bg-[#CFE1F1] md:ml-15 md:mt-8 lg:ml-20 xl:ml-44 xl:mt-10 rounded-4xl px-5 py-6 md:px-12 xl:px-24 md:py-10 xl:py-15">
        <div className="md:w-[40%] flex flex-col items-start">
          <h1 className="xl:text-7xl lg:text-6xl text-5xl font-bold leading-tight">
            Fast, safe social payments
          </h1>
          <p className="md:mt-3 mt-2 ml-1 text-sm md:text-md">
            Pay, get paid, grow a business, and more. Join the tens of millions of people on Payzo.
          </p>
          <button className="px-4 py-2 rounded-xl shadow text-white bg-blue-500 md:mt-8 lg:mt-10 mt-5 hover:bg-purple-600 ml-2">
            Get Payzo
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div
        className="md:w-[48%] lg:w-[45%] xl:w-[39%] w-full md:h-[75%] h-80 md:absolute md:top-[35%] md:left-[45%] lg:left-[48%] rounded-3xl mt-4 xl:mt-0"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/599922122/photo/group-of-friends-watching-video-on-smartphone.jpg?s=612x612&w=0&k=20&c=ZaM6C5Dkr_utIzsxuJt-c35L8TbbnaiaAV4_IzXiCdk=')`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
     
    </div>
     {/* Additional Section - Features */}
    <div className="w-full md:mt-20 mt-5 px-4 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
          Why Choose Payzo?
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="bg-white shadow-md p-5 rounded-xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
            <p className="text-gray-600 text-sm">
              Our top-notch encryption keeps your money and data safe, always.
            </p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Instant Payments</h3>
            <p className="text-gray-600 text-sm">
              Send and receive money within seconds—anytime, anywhere.
            </p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Business Growth</h3>
            <p className="text-gray-600 text-sm">
              Tools and insights to help your business thrive in the digital world.
            </p>
          </div>
        </div>
      </div>

        <section className="w-full mt-16 px-4 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "Payzo makes managing payments effortless and reliable!"
            </p>
            <h3 className="font-bold">Alex Johnson</h3>
            <p className="text-sm text-gray-500">Freelancer</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "Our business growth skyrocketed thanks to Payzo’s tools."
            </p>
            <h3 className="font-bold">Maria Rodriguez</h3>
            <p className="text-sm text-gray-500">Small Business Owner</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "Instant payments save us so much time every day!"
            </p>
            <h3 className="font-bold">David Lee</h3>
            <p className="text-sm text-gray-500">E-commerce Manager</p>
          </div>
        </div>
      </section>




      {/* Footer */}
     <footer className="w-full bg-[#499ae0] text-white py-10 px-4 mt-15 md:px-20 shadow-lg">
  <div className="flex flex-col md:flex-row justify-between gap-8">
    {/* Column 1 */}
    <div className="mb-6 md:mb-0">
      <h3 className="font-extrabold text-2xl mb-3 tracking-tight">Payzo</h3>
      <p className="text-sm max-w-xs opacity-90 leading-relaxed">
        Fast, secure, and social payments for everyone.
      </p>
    </div>

    {/* Column 2 */}
    <div className="mb-6 md:mb-0">
      <h4 className="font-bold uppercase text-sm tracking-wider mb-3 border-b border-white/30 pb-1">Company</h4>
      <ul className="text-sm space-y-2">
        {["About Us", "Careers", "Blog"].map((item) => (
          <li key={item} className="hover:text-blue-100 transition-colors duration-300">
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Column 3 */}
    <div className="mb-6 md:mb-0">
      <h4 className="font-bold uppercase text-sm tracking-wider mb-3 border-b border-white/30 pb-1">Support</h4>
      <ul className="text-sm space-y-2">
        {["Help Center", "Contact Us", "Privacy Policy"].map((item) => (
          <li key={item} className="hover:text-blue-100 transition-colors duration-300">
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Column 4 */}
    <div>
      <h4 className="font-bold uppercase text-sm tracking-wider mb-3 border-b border-white/30 pb-1">Follow Us</h4>
      <div className="flex space-x-4 mt-3">
        {[{icon:<TiSocialFacebook />,link:""},{icon:<SlSocialInstagram />,link:""},{ icon:<FaGithub />,link:"https://github.com/Anmolwalia07/Payzo"}].map((i, index) => (
          <a
            key={index}
            href={i.link}
            className="text-xl hover:scale-110 transform transition-all duration-300"
          >
            {i.icon}
          </a>
        ))}
      </div>
    </div>
  </div>

  <div className="mt-10 pt-6 text-center text-sm border-t border-white/20">
    <p className="text-white/80">&copy; 2025  Payzo. All rights reserved.</p>
  </div>
</footer>

    </>
  );
}

export default Main;
