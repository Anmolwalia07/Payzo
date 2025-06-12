function Main() {
  return (
    <div className='w-full h-auto flex md:relative px-6 md:px-0 sm:mt-5  mt-2 md:mt-4 xl:mt-0 flex-col md:flex-row'>
        <div className='w-full md:w-[70%] xl:w-[65%] bg-[#CFE1F1] md:ml-15 md:mt-8 lg:ml-20   xl:ml-44  xl:mt-10 rounded-4xl px-5 py-6  md:px-12 xl:px-24 md:py-10 xl:py-15'>
        <div className='md:w-[40%] flex flex-col items-start'>
        <h1 className='xl:text-7xl lg:text-6xl text-5xl'>Fast,safe social payments</h1>
        <p className='md:mt-2 mt-1 ml-1 text-sm md:text-md'>Pay,get paid,grow a bussiness,and more.Join the tens of millions of people on Payzo</p>
        <button className=' px-2.5 p-1.5 rounded-xl shadow text-white bg-blue-400 md:mt-8 lg:mt-10 mt-5 hover:bg-purple-600 ml-2'>Get Payzo</button>
        </div>
        </div>
        <div className="md:w-[48%] lg:w-[45%] xl:w-[39%] w-full md:h-[75%] h-80 md:absolute md:top-[35%] md:left-[45%] lg:left-[48%] rounded-3xl mt-4 xl:mt-0" style={{
            backgroundImage:`url('https://media.istockphoto.com/id/599922122/photo/group-of-friends-watching-video-on-smartphone.jpg?s=612x612&w=0&k=20&c=ZaM6C5Dkr_utIzsxuJt-c35L8TbbnaiaAV4_IzXiCdk=')`,
            backgroundPosition:'bottom',
        }}></div>
        <div className="md:hidden font-medium flex justify-center text-2xl text-blue-400 mb-5 mt-2">Having the best experience</div>

    </div>
    
  )
}

export default Main