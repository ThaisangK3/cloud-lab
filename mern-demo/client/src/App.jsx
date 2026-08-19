import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

  // Câu 47: Gọi API GET /api/students
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 49: Gửi Form đến API POST /api/students
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ studentId: '', name: '', email: '' });
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi thêm:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quản Lý Sinh Viên</h1>

      {/* Câu 48: Form nhập thông tin */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          placeholder="MSSV"
          value={form.studentId}
          onChange={e => setForm({ ...form, studentId: e.target.value })}
          required
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input
          placeholder="Họ tên"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <button type="submit" style={{ padding: '6px 12px' }}>Thêm sinh viên</button>
      </form>

      <h2>Danh Sách Sinh Viên</h2>
      <ul>
        {students.map(s => (
          <li key={s._id}>{s.studentId} - {s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;