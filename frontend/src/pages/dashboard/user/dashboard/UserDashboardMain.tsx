// src/pages/dashboard/user/dashboard/UserDashboardMain.tsx




const UserDashboardMain = () => {

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 md:gap-8 pt-2 md:pt-8">
      {/* top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
        <div className="bg-white shadow border rounded-lg h-[220px] w-full">first</div>
        <div className="bg-white shadow border rounded-lg h-[220px] w-full">second</div>
        <div className="bg-white shadow border rounded-lg h-[220px] w-full">third</div>
        <div className="bg-white shadow border rounded-lg h-[220px] w-full">four</div>
        <div className="bg-white shadow border rounded-lg h-[220px] w-full">five</div>
      </div>
      {/* middle section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* left section */}
        <div className="w-full lg:w-[50%] h-[440px] flex bg-white shadow border rounded-lg">
          <div>left side</div>
        </div>
        {/* right section */}
        <div className="w-full lg:w-[50%] h-[440px] flex flex-col gap-4">
          <div className="w-full h-full bg-white shadow border rounded-lg">right side</div>
        </div>
      </div>
      {/* bottom section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* left side */}
        <div className="w-full h-60 bg-white shadow rounded-md border">left</div>
        {/* middle side */}
        <div className="w-full h-60 bg-white shadow rounded-md border">middle</div>
        {/* right side */}
        <div className="w-full h-60 bg-white shadow rounded-md border">right</div>
      </div>
    </div>
  )
}

export default UserDashboardMain;