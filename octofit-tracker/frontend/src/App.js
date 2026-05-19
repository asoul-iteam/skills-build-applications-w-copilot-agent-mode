import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
];

const Home = () => {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <h1 className="display-6 fw-bold text-primary-emphasis mb-3">Octofit Tracker Dashboard</h1>
        <p className="lead text-secondary mb-4">
          Explore your users, teams, activities, workouts, and leaderboard data with consistent tables.
        </p>
        <div className="d-flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="btn btn-primary">
              Open {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
          <div className="container py-2">
            <Link className="navbar-brand fw-bold text-primary" to="/">Octofit Tracker</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavigation"
              aria-controls="mainNavigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mainNavigation">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-1">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'active fw-semibold' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <main className="container py-4 py-md-5">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
