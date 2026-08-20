import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

  // Tự động nhận diện URL Backend trên Codespaces hoặc Localhost
  const API_URL = window.location.hostname.includes('github.dev') || window.location.hostname.includes('app.github.dev')
    ? `https://${window.location.hostname.replace('-5173', '-5000')}/api/students`
    : 'http://localhost:5000/api/students';

  // Câu 47: Lấy danh sách sinh viên từ Backend API
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 48 & 49: Xử lý Form và gửi request POST thêm sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ studentId: '', name: '', email: '' });
      fetchStudents(); // Tải lại danh sách sau khi thêm
    } catch (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Quản Lý Sinh Viên</h2>
      
      {/* Form nhập thông tin */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          placeholder="Mã Sinh Viên" 
          value={form.studentId} 
          onChange={e => setForm({...form, studentId: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Họ và Tên" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Email" 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Thêm Sinh Viên
        </button>
      </form>

      {/* Hiển thị danh sách sinh viên */}
      <h3>Danh Sách Sinh Viên</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(std => (
          <li key={std._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span><strong>{std.studentId}</strong> - {std.name} ({std.email})</span>
            <button onClick={() => handleDelete(std._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;