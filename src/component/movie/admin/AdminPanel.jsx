function AdminPanel(){
    return(
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="flex flex-col space-y-4">
          <button
            // onClick={() => navigateTo('/manage-movies')}
            className="bg-blue-500 text-white p-4 rounded"
          >
            Manage Movies
          </button>
          <button
            // onClick={() => navigateTo('/manage-shows')}
            className="bg-green-500 text-white p-4 rounded"
          >
            Manage Shows
          </button>
          <button
            // onClick={() => navigateTo('/manage-users')}
            className="bg-red-500 text-white p-4 rounded"
          >
            Manage Users
          </button>
        </div>
      </div>
    )
}

export default AdminPanel;