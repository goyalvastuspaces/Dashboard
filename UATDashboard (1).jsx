import React, { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function UATDashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ user:"", project:"PI", release:"R1", designed:"", executed:"", passed:"", failed:"" });

  const summary = useMemo(()=>{
    return data.reduce((acc,d)=>{
      acc.executed+=Number(d.executed||0);
      acc.passed+=Number(d.passed||0);
      acc.failed+=Number(d.failed||0);
      return acc;
    },{executed:0,passed:0,failed:0})
  },[data]);

  const add = ()=>{
    setData([...data,{...form,id:Date.now()}]);
    setForm({ user:"", project:"PI", release:"R1", designed:"", executed:"", passed:"", failed:""});
  }

  return (
    <div style={{padding:20,fontFamily:"Arial"}}>
      <h2>UAT Dashboard</h2>

      <div style={{marginBottom:20}}>
        <input placeholder="User" value={form.user} onChange={e=>setForm({...form,user:e.target.value})} />
        <input placeholder="Release" value={form.release} onChange={e=>setForm({...form,release:e.target.value})} />
        <input placeholder="Executed" type="number" value={form.executed} onChange={e=>setForm({...form,executed:e.target.value})} />
        <input placeholder="Passed" type="number" value={form.passed} onChange={e=>setForm({...form,passed:e.target.value})} />
        <input placeholder="Failed" type="number" value={form.failed} onChange={e=>setForm({...form,failed:e.target.value})} />
        <button onClick={add}>Add</button>
      </div>

      <h3>Summary</h3>
      <p>Executed: {summary.executed} | Passed: {summary.passed} | Failed: {summary.failed}</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="executed" fill="#8884d8" />
          <Bar dataKey="passed" fill="#82ca9d" />
          <Bar dataKey="failed" fill="#ff6b6b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
