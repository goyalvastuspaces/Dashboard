import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function App() {
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    user: "",
    projectType: "PI",
    coeType: "COE",
    release: "R1",
    designed: "",
    executed: "",
    passed: "",
    failed: ""
  });

  const [filter, setFilter] = useState({
    projectType: "All",
    coeType: "All",
    release: "All",
    user: ""
  });

  const addRecord = () => {
    setRecords([...records, { ...form, id: Date.now() }]);

    setForm({
      user: "",
      projectType: "PI",
      coeType: "COE",
      release: "R1",
      designed: "",
      executed: "",
      passed: "",
      failed: ""
    });
  };

  const filteredData = useMemo(() => {
    return records.filter((r) => {
      return (
        (filter.projectType === "All" ||
          r.projectType === filter.projectType) &&
        (filter.coeType === "All" || r.coeType === filter.coeType) &&
        (filter.release === "All" || r.release === filter.release) &&
        (!filter.user ||
          r.user.toLowerCase().includes(filter.user.toLowerCase()))
      );
    });
  }, [records, filter]);

  const summary = useMemo(() => {
    return filteredData.reduce(
      (acc, r) => {
        acc.designed += Number(r.designed || 0);
        acc.executed += Number(r.executed || 0);
        acc.passed += Number(r.passed || 0);
        acc.failed += Number(r.failed || 0);
        return acc;
      },
      { designed: 0, executed: 0, passed: 0, failed: 0 }
    );
  }, [filteredData]);

  const passRate =
    summary.executed > 0
      ? Math.round((summary.passed / summary.executed) * 100)
      : 0;

  const stakeholderSummary = `
UAT Status: ${summary.executed} executed, ${summary.passed} passed, ${summary.failed} failed.
Pass Rate: ${passRate}% 
Scope: ${filter.projectType} / ${filter.coeType} / ${filter.release}
`;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🚀 UAT Dashboard</h1>

      {/* INPUT */}
      <h3>Add Update</h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input placeholder="User" value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })} />

        <select value={form.projectType}
          onChange={(e) =>
            setForm({ ...form, projectType: e.target.value })}>
          <option>PI</option>
          <option>Main Project</option>
        </select>

        <select value={form.coeType}
          onChange={(e) => setForm({ ...form, coeType: e.target.value })}>
          <option>COE</option>
          <option>Non-COE</option>
        </select>

        <input placeholder="Release" value={form.release}
          onChange={(e) =>
            setForm({ ...form, release: e.target.value })} />

        <input type="number" placeholder="Designed"
          value={form.designed}
          onChange={(e) =>
            setForm({ ...form, designed: e.target.value })} />

        <input type="number" placeholder="Executed"
          value={form.executed}
          onChange={(e) =>
            setForm({ ...form, executed: e.target.value })} />

        <input type="number" placeholder="Passed"
          value={form.passed}
          onChange={(e) =>
            setForm({ ...form, passed: e.target.value })} />

        <input type="number" placeholder="Failed"
          value={form.failed}
          onChange={(e) =>
            setForm({ ...form, failed: e.target.value })} />

        <button onClick={addRecord}>Add</button>
      </div>

      <hr />

      {/* FILTERS */}
      <h3>Filters</h3>
      <div style={{ display: "flex", gap: 10 }}>
        <select onChange={(e) =>
          setFilter({ ...filter, projectType: e.target.value })}>
          <option>All</option>
          <option>PI</option>
          <option>Main Project</option>
        </select>

        <select onChange={(e) =>
          setFilter({ ...filter, coeType: e.target.value })}>
          <option>All</option>
          <option>COE</option>
          <option>Non-COE</option>
        </select>

        <input placeholder="Release"
          onChange={(e) =>
            setFilter({ ...filter, release: e.target.value })} />

        <input placeholder="User"
          onChange={(e) =>
            setFilter({ ...filter, user: e.target.value })} />
      </div>

      <hr />

      {/* SUMMARY */}
      <h3>Summary</h3>
      <p>
        Designed: {summary.designed} | Executed: {summary.executed} | Passed: {summary.passed} | Failed: {summary.failed} | Pass %: {passRate}
      </p>

      {/* CHART */}
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="executed" fill="#3b82f6" />
            <Bar dataKey="passed" fill="#22c55e" />
            <Bar dataKey="failed" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <hr />

      {/* TABLE */}
      <h3>Details</h3>
      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Project</th>
            <th>COE</th>
            <th>Release</th>
            <th>Designed</th>
            <th>Executed</th>
            <th>Passed</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((r) => (
            <tr key={r.id}>
              <td>{r.user}</td>
              <td>{r.projectType}</td>
              <td>{r.coeType}</td>
              <td>{r.release}</td>
              <td>{r.designed}</td>
              <td>{r.executed}</td>
              <td>{r.passed}</td>
              <td>{r.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* STAKEHOLDER SUMMARY */}
      <h3>📢 Stakeholder Summary</h3>
      <pre>{stakeholderSummary}</pre>
    </div>
  );
}
