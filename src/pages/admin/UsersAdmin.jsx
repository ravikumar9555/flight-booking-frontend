export default function UsersAdmin() {
  const users = [
    { id: 1, email: "admin@gmail.com", role: "ADMIN" },
    { id: 2, email: "user@gmail.com", role: "CUSTOMER" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
