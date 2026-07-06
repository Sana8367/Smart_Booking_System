import { useAuth } from "../auth/AuthContext";

export default function Profile() {
const { user } = useAuth();

return ( <div className="dashboard-page page-fade bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-[calc(100vh-60px)]">

```
  {/* HEADER */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-800">
      Profile
    </h1>
    <p className="text-slate-500">
      Manage your personal information
    </p>
  </div>

  {/* CARD */}
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">

    {/* TOP */}
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-xl font-semibold">
          {user?.name}
        </h2>
        <p className="text-slate-500">
          {user?.email}
        </p>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
        Edit
      </button>
    </div>

    {/* FORM */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <Input label="Full Name" placeholder={user?.name} />
      <Input label="Nick Name" placeholder="Nick Name" />

      <Select label="Gender" options={["Female", "Male", "Other"]} />
      <Select label="Country" options={["India", "USA", "UK"]} />

      <Select label="Language" options={["English", "Hindi"]} />
      <Select label="Time Zone" options={["GMT +5:30", "GMT"]} />

    </div>

    {/* EMAIL */}
    <div className="mt-10 border-t pt-6">
      <h3 className="font-semibold mb-3">
        Email Address
      </h3>
      <p className="text-slate-700">
        {user?.email}
      </p>
    </div>

  </div>
</div>

);
}

/* Reusable Components */

function Input({ label, placeholder }) {
return ( <div> <label className="text-sm text-slate-600">{label}</label> <input
     placeholder={placeholder}
     className="w-full mt-2 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
   /> </div>
);
}

function Select({ label, options }) {
return ( <div> <label className="text-sm text-slate-600">{label}</label> <select className="w-full mt-2 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none">
{options.map((o) => ( <option key={o}>{o}</option>
))} </select> </div>
);
}
