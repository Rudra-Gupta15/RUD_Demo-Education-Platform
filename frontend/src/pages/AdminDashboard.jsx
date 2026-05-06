import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { demoCourses } from "../data/courses";
import SEO from "../components/SEO.jsx";

// ── Icons (lucide-react) ──────────────────────────────────────────────────────
import {
  LayoutDashboard, Users, BookOpen, Terminal, ShieldCheck,
  Mail, Settings, LogOut, Plus, Trash2, Edit, ArrowRight,
  Download, Bell, X, Save, Sun, Moon, ExternalLink,
  Activity, Globe, Cpu, Zap, Upload
} from "lucide-react";
import { Link } from "react-router-dom";

// ── Styles ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .qr-dash *, .qr-dash *::before, .qr-dash *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .qr-dash {
    font-family: 'Outfit', sans-serif;
    display: flex;
    min-height: 100vh;
    background: #f8fafc;
    color: #0f172a;
    transition: background 0.3s, color 0.3s;
  }
  .qr-dash.dark {
    background: #020617;
    color: #f1f5f9;
  }

  /* ── Sidebar ── */
  .qr-sidebar {
    width: 260px;
    flex-shrink: 0;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 40;
    box-shadow: 10px 0 30px -15px rgba(0,0,0,0.03);
  }
  .qr-dash.dark .qr-sidebar { background: #0f172a; border-right-color: #1e293b; }

  .qr-logo {
    padding: 32px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .qr-logo:hover { opacity: 0.8; }
  .qr-logo-icon {
    width: 38px; height: 38px;
    border-radius: 8px;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: #fff;
    border: 1px solid #e2e8f0;
  }
  .qr-logo-icon svg { color: #fff; width: 20px; height: 20px; }
  .qr-logo-name { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; }
  .qr-dash.dark .qr-logo-name { color: #f1f5f9; }
  .qr-logo-sub { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-top: 2px; }

  .qr-nav { flex: 1; padding: 0 16px; overflow-y: auto; }
  .qr-nav-section {
    font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase;
    color: #94a3b8; padding: 24px 12px 8px; font-weight: 700;
  }
  .qr-nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 12px;
    cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 4px; border: none; width: 100%;
    background: transparent; text-align: left;
    font-family: 'Inter', sans-serif;
    color: #64748b; font-size: 14px; font-weight: 500;
  }
  .qr-dash.dark .qr-nav-item { color: #94a3b8; }
  .qr-nav-item:hover { background: #f1f5f9; color: #2563eb; }
  .qr-dash.dark .qr-nav-item:hover { background: #1e293b; color: #3b82f6; }
  .qr-nav-item.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 600;
  }
  .qr-dash.dark .qr-nav-item.active { background: #1e293b; color: #3b82f6; }
  .qr-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
  .qr-nav-badge {
    margin-left: auto; font-size: 11px; font-weight: 700;
    background: #2563eb; color: #fff;
    padding: 2px 8px; border-radius: 99px;
  }

  .qr-user {
    margin: 16px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .qr-dash.dark .qr-user { background: #1e293b; }
  .qr-user-avatar {
    width: 40px; height: 40px; border-radius: 12px;
    background: #2563eb; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; flex-shrink: 0;
  }
  .qr-user-name { font-size: 14px; font-weight: 600; color: #0f172a; }
  .qr-dash.dark .qr-user-name { color: #f1f5f9; }
  .qr-user-role { font-size: 11px; color: #64748b; font-weight: 500; }
  .qr-logout {
    margin-left: auto; background: #fff; border: 1px solid #e2e8f0;
    cursor: pointer; color: #64748b; width: 32px; height: 32px;
    border-radius: 8px; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .qr-dash.dark .qr-logout { background: #0f172a; border-color: #334155; }
  .qr-logout:hover { color: #ef4444; border-color: #fca5a5; background: #fef2f2; }
  .qr-logout svg { width: 16px; height: 16px; }

  /* ── Main ── */
  .qr-main { flex: 1; margin-left: 260px; display: flex; flex-direction: column; min-height: 100vh; }

  .qr-topbar {
    padding: 20px 32px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 30;
  }
  .qr-dash.dark .qr-topbar { background: rgba(15, 23, 42, 0.8); border-bottom-color: #1e293b; }
  .qr-topbar-title { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
  .qr-dash.dark .qr-topbar-title { color: #f1f5f9; }
  .qr-topbar-sub { font-size: 13px; color: #64748b; margin-top: 2px; font-weight: 500; }
  .qr-topbar-actions { display: flex; align-items: center; gap: 12px; }
  .qr-live {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600;
    background: #f0fdf4; color: #16a34a;
    padding: 6px 14px; border-radius: 99px;
    border: 1px solid #dcfce7;
  }
  .qr-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0); } }
  
  .qr-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 10px;
    border: 1px solid #e2e8f0;
    font-size: 13px; font-weight: 600;
    cursor: pointer; background: #fff;
    color: #475569; font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }
  .qr-dash.dark .qr-btn { border-color: #334155; color: #94a3b8; background: #0f172a; }
  .qr-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
  .qr-dash.dark .qr-btn:hover { background: #1e293b; }
  .qr-btn svg { width: 16px; height: 16px; }
  .qr-btn-primary {
    background: #2563eb !important;
    color: #fff !important;
    border-color: #2563eb !important;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
  .qr-btn-primary:hover { background: #1d4ed8 !important; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3); }

  /* ── Content ── */
  .qr-content { padding: 32px; flex: 1; }

  /* ── Metrics ── */
  .qr-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
  .qr-metric {
    background: #fff; border: 1px solid #e2e8f0;
    border-radius: 20px; padding: 24px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01);
    transition: transform 0.2s;
  }
  .qr-metric:hover { transform: translateY(-4px); }
  .qr-dash.dark .qr-metric { background: #0f172a; border-color: #1e293b; }
  .qr-metric-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .qr-metric-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .qr-metric-icon svg { width: 22px; height: 22px; }
  .qr-delta { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
  .qr-delta-up { background: #f0fdf4; color: #16a34a; }
  .qr-delta-neutral { background: #f1f5f9; color: #64748b; }
  .qr-dash.dark .qr-delta-neutral { background: #1e293b; }
  .qr-metric-value { font-size: 28px; font-weight: 700; line-height: 1.2; margin-bottom: 4px; color: #0f172a; }
  .qr-dash.dark .qr-metric-value { color: #f1f5f9; }
  .qr-metric-label { font-size: 13px; color: #64748b; font-weight: 500; }

  /* ── Panels ── */
  .qr-two-col { display: grid; grid-template-columns: 1fr 340px; gap: 24px; margin-bottom: 24px; }
  .qr-panel {
    background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
  }
  .qr-dash.dark .qr-panel { background: #0f172a; border-color: #1e293b; }
  .qr-panel-header {
    padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .qr-dash.dark .qr-panel-header { border-bottom-color: #1e293b; }
  .qr-panel-title { font-size: 17px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; }
  .qr-dash.dark .qr-panel-title { color: #f1f5f9; }
  .qr-panel-action { font-size: 13px; color: #2563eb; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 600; }
  .qr-panel-action svg { width: 14px; height: 14px; }

  /* ── Table ── */
  .qr-table-wrap { overflow-x: auto; }
  table.qr-table { width: 100%; border-collapse: collapse; }
  table.qr-table th {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
    color: #64748b; font-weight: 700; padding: 12px 24px; text-align: left;
    background: #f8fafc; border-bottom: 1px solid #e2e8f0;
  }
  .qr-dash.dark table.qr-table th { background: #1e293b; border-bottom-color: #334155; color: #94a3b8; }
  table.qr-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
  .qr-dash.dark table.qr-table td { border-bottom-color: #1e293b; color: #cbd5e1; }
  table.qr-table tr:last-child td { border-bottom: none; }
  table.qr-table tbody tr { transition: background 0.2s; }
  table.qr-table tbody tr:hover td { background: #f8fafc; }
  .qr-dash.dark table.qr-table tbody tr:hover td { background: #1e293b; }
  
  .qr-row-avatar {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
  }
  .qr-row-name { font-size: 14px; font-weight: 600; color: #0f172a; }
  .qr-dash.dark .qr-row-name { color: #f1f5f9; }
  .qr-row-sub { font-size: 12px; color: #64748b; margin-top: 1px; }
  .qr-mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
  .qr-dash.dark .qr-mono { background: #1e293b; color: #94a3b8; }

  .qr-badge { 
    font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 99px; 
    display: inline-flex; align-items: center; gap: 6px; 
    letter-spacing: 0.02em; text-transform: uppercase;
  }
  .qr-badge-success { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }
  .qr-badge-info { background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; }
  .qr-badge-danger { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
  .qr-badge-warn { background: #fffbeb; color: #d97706; border: 1px solid #fef3c7; }

  .qr-action-btn {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0;
    background: #fff; cursor: pointer; display: inline-flex;
    align-items: center; justify-content: center; color: #64748b;
    transition: all 0.2s; margin-left: 4px;
  }
  .qr-dash.dark .qr-action-btn { background: #0f172a; border-color: #334155; }
  .qr-action-btn:hover { background: #f1f5f9; color: #2563eb; border-color: #cbd5e1; }
  .qr-action-btn.danger:hover { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }
  .qr-action-btn svg { width: 14px; height: 14px; }

  /* ── Activity ── */
  .qr-activity { padding: 8px 24px 24px; }
  .qr-act-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #f1f5f9; position: relative; }
  .qr-dash.dark .qr-act-item { border-bottom-color: #1e293b; }
  .qr-act-item:last-child { border-bottom: none; }
  .qr-act-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; z-index: 2; border: 2px solid #fff; box-shadow: 0 0 0 4px rgba(0,0,0,0.03); }
  .qr-dash.dark .qr-act-dot { border-color: #0f172a; }
  .qr-act-item::before { content: ''; position: absolute; left: 4px; top: 24px; bottom: -8px; width: 2px; background: #f1f5f9; }
  .qr-dash.dark .qr-act-item::before { background: #1e293b; }
  .qr-act-item:last-child::before { display: none; }
  .qr-act-text { font-size: 13px; line-height: 1.5; color: #334155; font-weight: 500; }
  .qr-dash.dark .qr-act-text { color: #cbd5e1; }
  .qr-act-time { font-size: 11px; color: #94a3b8; margin-top: 4px; font-weight: 600; }

  /* ── Bottom row ── */
  .qr-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .qr-course-item { display: flex; align-items: center; gap: 16px; padding: 16px 24px; border-bottom: 1px solid #f1f5f9; }
  .qr-dash.dark .qr-course-item { border-bottom-color: #1e293b; }
  .qr-course-item:last-child { border-bottom: none; }
  .qr-course-num { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #94a3b8; width: 24px; flex-shrink: 0; font-weight: 700; }
  .qr-course-name { font-size: 14px; font-weight: 600; flex: 1; color: #0f172a; }
  .qr-dash.dark .qr-course-name { color: #f1f5f9; }
  .qr-course-meta { font-size: 12px; color: #64748b; white-space: nowrap; font-weight: 500; }
  .qr-progress { width: 80px; height: 6px; background: #f1f5f9; border-radius: 99px; overflow: hidden; flex-shrink: 0; }
  .qr-dash.dark .qr-progress { background: #1e293b; }
  .qr-progress-fill { height: 100%; background: linear-gradient(90deg, #2563eb, #3b82f6); border-radius: 99px; }

  .qr-api-item { display: flex; align-items: center; gap: 16px; padding: 16px 24px; border-bottom: 1px solid #f1f5f9; }
  .qr-dash.dark .qr-api-item { border-bottom-color: #1e293b; }
  .qr-api-item:last-child { border-bottom: none; }
  .qr-method {
    font-size: 10px; font-weight: 800; padding: 4px 8px;
    border-radius: 6px; font-family: 'JetBrains Mono', monospace;
    flex-shrink: 0; width: 50px; text-align: center;
  }
  .qr-method-get { background: #eff6ff; color: #2563eb; }
  .qr-method-post { background: #f0fdf4; color: #16a34a; }
  .qr-method-del { background: #fef2f2; color: #dc2626; }
  .qr-api-path { font-size: 13px; font-family: 'JetBrains Mono', monospace; flex: 1; color: #334155; font-weight: 500; }
  .qr-dash.dark .qr-api-path { color: #cbd5e1; }
  .qr-api-desc { font-size: 12px; color: #64748b; font-weight: 500; }

  /* ── Settings ── */
  .qr-settings { max-width: 800px; }
  .qr-setting-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 32px; border-bottom: 1px solid #f1f5f9;
    gap: 32px;
    transition: background 0.2s;
  }
  .qr-setting-row:hover { background: #fafafa; }
  .qr-dash.dark .qr-setting-row:hover { background: #1e293b; }
  .qr-setting-row:last-child { border-bottom: none; }
  .qr-dash.dark .qr-setting-row { border-bottom-color: #1e293b; }
  .qr-setting-label { font-size: 15px; font-weight: 600; color: #0f172a; }
  .qr-dash.dark .qr-setting-label { color: #f1f5f9; }
  .qr-setting-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
  .qr-theme-btns { display: flex; gap: 12px; }
  .qr-theme-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 12px; border: 1px solid #e2e8f0;
    font-size: 13px; font-weight: 600; cursor: pointer;
    background: #fff; font-family: 'Inter', sans-serif;
    transition: all 0.2s; color: #64748b;
  }
  .qr-dash.dark .qr-theme-btn { background: #0f172a; border-color: #334155; }
  .qr-theme-btn svg { width: 16px; height: 16px; }
  .qr-theme-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }

  /* ── Modal ── */
  .qr-overlay {
    position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .qr-modal { position: relative; width: 100%; max-width: 520px; background: #fff; border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
  .qr-modal.wide { max-width: 850px; }
  .qr-dash.dark .qr-modal { background: #0f172a; border: 1px solid #1e293b; }
  .qr-modal-title { font-size: 20px; font-weight: 700; margin-bottom: 24px; color: #0f172a; letter-spacing: -0.02em; }
  .qr-dash.dark .qr-modal-title { color: #f1f5f9; }
  .qr-modal-close {
    position: absolute; top: 24px; right: 24px;
    background: transparent; border: none; color: #64748b;
    cursor: pointer; padding: 4px; border-radius: 8px;
    transition: all 0.2s; display: flex; align-items: center; justify-content: center;
  }
  .qr-modal-close:hover { background: #f1f5f9; color: #0f172a; }
  .qr-dash.dark .qr-modal-close:hover { background: #1e293b; color: #f1f5f9; }
  .qr-modal-close svg { width: 20px; height: 20px; }

  .qr-modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
  .qr-dash.dark .qr-modal-actions { border-top-color: #1e293b; }

  .qr-field { margin-bottom: 20px; }
  .qr-field label { display: block; font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.02em; }
  .qr-dash.dark .qr-field label { color: #94a3b8; }
  .qr-field input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; background: #fff; outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .qr-dash.dark .qr-field input { background: #0f172a; border-color: #334155; color: #fff; }
  .qr-field input:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }

  /* ── Loading ── */
  .qr-loading { display: flex; align-items: center; justify-content: center; padding: 40px; color: #aaa; font-size: 13px; }
  .qr-empty { padding: 32px; text-align: center; color: #aaa; font-size: 13px; }

  .qr-row-thumb { width: 44px; height: 28px; border-radius: 4px; overflow: hidden; border: 1px solid #e5e5e5; background: #eee; }
  .qr-row-thumb img { width: 100%; height: 100%; object-cover: cover; }
  .qr-textarea { width: 100%; padding: 9px 12px; border-radius: 7px; border: 1px solid #e5e5e5; font-size: 13px; font-family: 'DM Sans', sans-serif; background: #fafafa; outline: none; resize: vertical; }
  .qr-dash.dark .qr-textarea { background: #0d0d0d; border-color: #333; color: #f0f0f0; }
  .qr-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .qr-input { width: 100%; padding: 9px 12px; border-radius: 7px; border: 1px solid #e5e5e5; font-size: 13px; background: #fafafa; outline: none; }
  .qr-dash.dark .qr-input { background: #0d0d0d; border-color: #333; color: #f0f0f0; }

  .qr-preview-box { width: 120px; height: 80px; border-radius: 12px; overflow: hidden; background: #f5f5f5; border: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: center; }
  .qr-preview-box img { width: 100%; height: 100%; object-fit: cover; }
  .qr-no-img { font-size: 10px; color: #aaa; font-weight: 600; text-transform: uppercase; }
  .qr-upload-zone { flex: 1; }

  /* ── Messages ── */
  .qr-messages-list { display: grid; gap: 20px; }
  .qr-msg-card { background: #fff; border: 1px solid #e5e5e5; border-radius: 16px; padding: 24px; transition: all 0.2s; }
  .qr-dash.dark .qr-msg-card { background: #111; border-color: #222; }
  .qr-msg-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
  .qr-msg-sender { display: flex; gap: 12px; align-items: center; }
  .qr-msg-name { font-size: 14px; font-weight: 700; }
  .qr-msg-email { font-size: 12px; color: #64748b; }
  .qr-msg-meta { display: flex; items-center; gap: 12px; }
  .qr-msg-time { font-size: 11px; color: #94a3b8; font-weight: 600; }
  .qr-msg-org { font-size: 11px; color: #64748b; background: #f8fafc; padding: 6px 12px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #e2e8f0; }
  .qr-dash.dark .qr-msg-org { background: #1a1a1a; border-color: #222; color: #94a3b8; }
  .qr-msg-body { font-size: 13px; color: #475569; line-height: 1.6; white-space: pre-wrap; }
  .qr-dash.dark .qr-msg-body { color: #94a3b8; }
`;

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview",   label: "Overview",        icon: LayoutDashboard, section: "Main" },
  { id: "users",      label: "Users",           icon: Users,           badge: null,    section: null },
  { id: "courses",    label: "Courses",         icon: BookOpen,                        section: null },
  { id: "api",        label: "API Reference",   icon: Terminal,        section: "System" },
  { id: "dev_access", label: "Access Control",  icon: ShieldCheck,                     section: null },
  { id: "messages",   label: "Messages",        icon: Mail,            badge: "contacts_count", section: null },
  { id: "settings",   label: "Settings",        icon: Settings,                        section: null },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const AVATARS = ["#4f46e5","#0284c7","#16a34a","#d97706","#dc2626","#7c3aed","#0891b2"];
const avatarColor = (str) => AVATARS[(str?.charCodeAt(0) || 0) % AVATARS.length];
const initials = (name) => name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "?";
const today = new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth", { state: { from: "/dev-dashboard" } });
      } else if (user.email !== "lucifer@convosecai.com") {
        navigate("/learning");
      }
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) { setData([]); fetchTabData(activeTab); }
  }, [activeTab, user]);

  async function fetchTabData(tab) {
    setIsLoading(true);
    try {
      if (tab === "overview") {
        const res = await api("/api/admin/stats");
        setStats(res.stats);
        setData({ users: res.recentUsers || [], contacts: res.recentContacts || [] });
      } else if (tab === "users") {
        const res = await api("/api/admin/users");
        setData(Array.isArray(res.users) ? res.users : []);
      } else if (tab === "courses") {
        const res = await api("/api/courses");
        setData(Array.isArray(res.courses) ? res.courses : []);
      } else if (tab === "dev_access") {
        const res = await api("/api/admin/developers");
        setData(Array.isArray(res.developers) ? res.developers : []);
      } else if (tab === "messages") {
        const res = await api("/api/admin/contacts");
        setData(Array.isArray(res.contacts) ? res.contacts : []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm("Confirm deletion?")) return;
    try {
      let ep = `/api/admin/${type}/${id}`;
      if (type === "courses") ep = `/api/courses/${id}`;
      if (type === "dev_access") ep = `/api/admin/developers/${id}`;
      await api(ep, { method: "DELETE" });
      fetchTabData(activeTab);
    } catch (err) { alert("Error: " + err.message); }
  };

  const handleSaveDeveloper = async (payload) => {
    try {
      const method = editingItem ? "PUT" : "POST";
      const ep = editingItem
        ? `/api/admin/developers/${editingItem.id}`
        : "/api/admin/developers";
      await api(ep, { method, body: JSON.stringify(payload) });
      setIsModalOpen(false);
      setEditingItem(null);
      fetchTabData("dev_access");
    } catch (err) { alert("Failed: " + err.message); }
  };

  const handleSaveCourse = async (payload) => {
    try {
      const method = editingItem ? "PUT" : "POST";
      const ep = editingItem
        ? `/api/courses/${editingItem.id}`
        : "/api/courses";
      await api(ep, { method, body: JSON.stringify(payload) });
      setIsModalOpen(false);
      setEditingItem(null);
      fetchTabData("courses");
    } catch (err) { alert("Failed: " + err.message); }
  };

  const handleScanCatalog = async () => {
    if (!window.confirm("Scan and import demo courses from catalog?")) return;
    try {
      await api("/api/admin/bulk-courses", {
        method: "POST",
        body: JSON.stringify({ courses: demoCourses })
      });
      alert("Catalog scanned and updated!");
      fetchTabData("courses");
    } catch (err) { alert("Scan failed: " + err.message); }
  };

  const tabLabel = NAV.find(n => n.id === activeTab)?.label || activeTab;

  return (
    <>
      <SEO 
        title="Admin Dashboard | Control Plane" 
        description="Secure administrative interface for managing the ConvoSec AI education platform infrastructure and user metrics."
      />
      <style>{css}</style>
      <div className={`qr-dash${isDark ? " dark" : ""}`}>
        {/* ── Sidebar ── */}
        <aside className="qr-sidebar">
          <Link to="/" className="qr-logo">
            <div className="qr-logo-icon">
              <img src="/logo.png" alt="ConvoSec" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            </div>
            <div>
              <div className="qr-logo-name">ConvoSec AI</div>
              <div className="qr-logo-sub">Administration</div>
            </div>
          </Link>

          <nav className="qr-nav">
            {NAV.map((item, i) => {
              let badge = item.badge;
              if (badge === "contacts_count") {
                badge = stats?.contacts || null;
              }
              return (
                <div key={item.id}>
                  {item.section && <div className="qr-nav-section">{item.section}</div>}
                  <button
                    className={`qr-nav-item${activeTab === item.id ? " active" : ""}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon />
                    {item.label}
                    {badge && <span className="qr-nav-badge">{badge}</span>}
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="qr-user">
            <div className="qr-user-avatar">{initials(user?.name || "Admin")}</div>
            <div>
              <div className="qr-user-name">{user?.name || "Administrator"}</div>
              <div className="qr-user-role">System Root</div>
            </div>
            <button className="qr-logout" onClick={() => { logout(); navigate("/auth"); }} title="Sign out">
              <LogOut />
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="qr-main">
          <header className="qr-topbar">
            <div>
              <div className="qr-topbar-title">{tabLabel}</div>
              <div className="qr-topbar-sub">{today}</div>
            </div>
            <div className="qr-topbar-actions">
              <span className="qr-live"><span className="qr-live-dot" />All systems operational</span>
              <button className="qr-btn"><Bell size={13} /> Alerts</button>
              <button className="qr-btn"><Download size={13} /> Export</button>
              {activeTab === "users" && (
                <button className="qr-btn qr-btn-primary"><Plus size={13} /> New user</button>
              )}
              {activeTab === "courses" && (
                <>
                  <button className="qr-btn" onClick={handleScanCatalog}><Activity size={13} /> Scan Catalog</button>
                  <button className="qr-btn qr-btn-primary" onClick={() => { setEditingItem(null); setIsModalOpen(true); }}><Plus size={13} /> New Course</button>
                </>
              )}
              {activeTab === "dev_access" && (
                <button className="qr-btn qr-btn-primary" onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
                  <Plus size={13} /> Provision seat
                </button>
              )}
            </div>
          </header>

          <div className="qr-content">
            {activeTab === "overview" && (
              <OverviewTab stats={stats} data={data} isLoading={isLoading} onDelete={handleDelete} />
            )}
            {(activeTab === "users" || activeTab === "courses") && (
              <ResourceTab
                type={activeTab}
                data={Array.isArray(data) ? data : []}
                isLoading={isLoading}
                onDelete={handleDelete}
              />
            )}
            {activeTab === "api" && <ApiTab />}
            {activeTab === "dev_access" && (
              <DevAccessTab
                data={Array.isArray(data) ? data : []}
                isLoading={isLoading}
                onDelete={handleDelete}
                onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }}
              />
            )}
            {activeTab === "settings" && (
              <SettingsTab isDark={isDark} setIsDark={setIsDark} />
            )}
            {activeTab === "messages" && (
              <MessagesTab data={data} isLoading={isLoading} onDelete={handleDelete} />
            )}
          </div>
        </main>

        {/* ── Modal ── */}
        {isModalOpen && (
          <div className="qr-overlay" onClick={() => setIsModalOpen(false)}>
            <div className={`qr-modal ${activeTab === "courses" ? "wide" : ""}`} onClick={e => e.stopPropagation()}>
              <div className="qr-modal-title">
                {editingItem ? "Edit developer" : "Provision access"}
              </div>
              <button className="qr-modal-close" onClick={() => setIsModalOpen(false)}><X /></button>
              {activeTab === "dev_access" ? (
                <DeveloperForm
                  initialData={editingItem}
                  onSubmit={handleSaveDeveloper}
                  onCancel={() => setIsModalOpen(false)}
                />
              ) : (
                <CourseForm
                  initialData={editingItem}
                  onSubmit={handleSaveCourse}
                  onCancel={() => setIsModalOpen(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────────
function OverviewTab({ stats, data, isLoading, onDelete }) {
  const users = data?.users || [];
  const metrics = [
    { label: "Total users",   value: stats?.users ?? "—",   delta: "+12.4%", up: true,  iconStyle: { background: "#eef2ff" }, iconColor: "#4f46e5", Icon: Users },
    { label: "Active courses", value: stats?.courses ?? "—", delta: "+3 this week", up: true,  iconStyle: { background: "#f0fdf4" }, iconColor: "#16a34a", Icon: BookOpen },
    { label: "Inquiries",     value: stats?.contacts ?? "—", delta: "Pending", up: false, iconStyle: { background: "#fffbeb" }, iconColor: "#d97706", Icon: Mail },
    { label: "API uptime",    value: "99.98%",               delta: "Stable",  up: true,  iconStyle: { background: "#f0f9ff" }, iconColor: "#0284c7", Icon: Activity },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Operational Metrics</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Real-time snapshot of the platform's vital signs and growth indicators.</p>
      </div>

      {/* Metrics */}
      <div className="qr-metrics">
        {metrics.map((m, i) => (
          <div key={i} className="qr-metric">
            <div className="qr-metric-top">
              <div className="qr-metric-icon" style={m.iconStyle}>
                <m.Icon style={{ color: m.iconColor }} />
              </div>
              <span className={`qr-delta ${m.up ? "qr-delta-up" : "qr-delta-neutral"}`}>{m.delta}</span>
            </div>
            <div className="qr-metric-value">{isLoading ? "…" : m.value}</div>
            <div className="qr-metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Users + Activity */}
      <div className="qr-two-col">
        <div className="qr-panel">
          <div className="qr-panel-header">
            <span className="qr-panel-title">Recent users</span>
            <span className="qr-panel-action">View all <ArrowRight /></span>
          </div>
          {isLoading ? <div className="qr-loading">Loading…</div> : (
            <div className="qr-table-wrap">
              <table className="qr-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name / Email</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td><div className="qr-row-avatar" style={{ background: avatarColor(u.name) }}>{initials(u.name)}</div></td>
                      <td>
                        <div className="qr-row-name">{u.name}</div>
                        <div className="qr-row-sub">{u.email}</div>
                      </td>
                      <td><span className="qr-mono">{u.created_at ? new Date(u.created_at).toLocaleDateString("en-GB", { day:"numeric", month:"short" }) : "—"}</span></td>
                      <td><span className="qr-badge qr-badge-success">Active</span></td>
                      <td>
                        <button className="qr-action-btn" title="Edit"><Edit size={13} /></button>
                        <button className="qr-action-btn danger" title="Delete" onClick={() => onDelete("users", u.id)}><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan={5} className="qr-empty">No recent users</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="qr-panel">
          <div className="qr-panel-header">
            <span className="qr-panel-title">Recent activity</span>
            <span className="qr-panel-action">All logs <ArrowRight /></span>
          </div>
          <div className="qr-activity">
            {[
              { color: "#22c55e", text: "New security researcher registered — Sarah Chen", time: "2 hours ago" },
              { color: "#3b82f6", text: "Course 'Advanced VAPT' published successfully",  time: "5 hours ago" },
              { color: "#f59e0b", text: "Anomalous login attempt detected from IP 192.168.1.1", time: "Yesterday" },
              { color: "#ef4444", text: "Developer seat revoked — Operator #0019",          time: "Yesterday" },
              { color: "#22c55e", text: "Core security audit completed — No vulnerabilities", time: "May 4, 2026" },
            ].map((a, i) => (
              <div key={i} className="qr-act-item">
                <div className="qr-act-dot" style={{ background: a.color }} />
                <div>
                  <div className="qr-act-text">{a.text}</div>
                  <div className="qr-act-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Infrastructure Status</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Monitor curriculum distribution and system integration endpoints.</p>
      </div>

      {/* Courses + API */}
      <div className="qr-bottom-row">
        <div className="qr-panel">
          <div className="qr-panel-header">
            <span className="qr-panel-title">Course modules</span>
            <span className="qr-panel-action">Manage <ArrowRight /></span>
          </div>
          {[
            { num: "01", name: "Systems Architecture Fundamentals", enrolled: "312 enrolled", pct: 78 },
            { num: "02", name: "API Design & Integration Patterns",  enrolled: "218 enrolled", pct: 55 },
            { num: "03", name: "Infrastructure Security Essentials", enrolled: "174 enrolled", pct: 40 },
            { num: "04", name: "Data Engineering with Cloud Platforms", enrolled: "97 enrolled", pct: 22 },
          ].map((c, i) => (
            <div key={i} className="qr-course-item">
              <span className="qr-course-num">{c.num}</span>
              <span className="qr-course-name">{c.name}</span>
              <span className="qr-course-meta">{c.enrolled}</span>
              <div className="qr-progress"><div className="qr-progress-fill" style={{ width: `${c.pct}%` }} /></div>
            </div>
          ))}
        </div>

        <div className="qr-panel">
          <div className="qr-panel-header">
            <span className="qr-panel-title">API gateway</span>
            <span className="qr-panel-action">Full docs <ExternalLink size={11} /></span>
          </div>
          <ApiEndpoints />
        </div>
      </div>
    </div>
  );
}

// ── Resource Tab (Users / Courses) ────────────────────────────────────────────
function ResourceTab({ type, data, isLoading, onDelete, onEdit }) {
  const title = type === "users" ? "User Directory" : "Curriculum Engine";
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{type === 'users' ? 'Member Directory' : 'Course Management'}</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>{type === 'users' ? 'Oversee all registered students and platform members.' : 'Curate and manage the academic syllabus and learning paths.'}</p>
      </div>
      <div className="qr-panel">
        <div className="qr-panel-header">
          <span className="qr-panel-title">{title}</span>
          <span className="qr-panel-action">{data.length} records</span>
        </div>
        {isLoading ? <div className="qr-loading">Loading…</div> : (
          <div className="qr-table-wrap">
            <table className="qr-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name / Identifier</th>
                  <th>{type === "users" ? "Detail" : "Price"}</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {type === "courses" ? (
                        <div className="qr-row-thumb">
                          <img src={item.image} alt="" onError={e => e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&q=80"} />
                        </div>
                      ) : (
                        <div className="qr-row-avatar" style={{ background: avatarColor(item.name || item.title) }}>
                          {initials(item.name || item.title)}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="qr-row-name">{item.title || item.name}</div>
                      <div className="qr-row-sub">{item.email || item.slug || ""}</div>
                    </td>
                    <td>
                      <span className="qr-mono">
                        {type === "users" 
                          ? (item.id ? `#${String(item.id).padStart(4,"0")}` : "—")
                          : `₹${item.price}`
                        }
                      </span>
                    </td>
                    <td>
                      <span className={`qr-badge ${
                        item.status === "Inactive" ? "qr-badge-info" : 
                        item.status === "Suspended" ? "qr-badge-danger" : 
                        "qr-badge-success"
                      }`}>
                        {item.status || "Active"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="qr-action-btn" title="Edit" onClick={() => onEdit(item)}><Edit size={13} /></button>
                      <button className="qr-action-btn danger" title="Delete" onClick={() => onDelete(type, item.id)}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && <tr><td colSpan={5} className="qr-empty">No records found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── API Tab ───────────────────────────────────────────────────────────────────
function ApiTab() {
  return (
    <div className="qr-panel">
      <div className="qr-panel-header">
        <span className="qr-panel-title">Production gateway</span>
        <span className="qr-panel-action">Full docs <ExternalLink size={11} /></span>
      </div>
      <ApiEndpoints />
    </div>
  );
}

function ApiEndpoints() {
  const endpoints = [
    { method: "POST", cls: "qr-method-post", path: "/api/auth/signup",            desc: "User provisioning" },
    { method: "GET",  cls: "qr-method-get",  path: "/api/courses",                desc: "Fetch curriculum" },
    { method: "GET",  cls: "qr-method-get",  path: "/api/admin/stats",            desc: "System metrics" },
    { method: "POST", cls: "qr-method-post", path: "/api/admin/developers",       desc: "Provision access" },
    { method: "DEL",  cls: "qr-method-del",  path: "/api/admin/developers/:id",   desc: "Revoke seat" },
  ];
  return (
    <>
      {endpoints.map((ep, i) => (
        <div key={i} className="qr-api-item">
          <span className={`qr-method ${ep.cls}`}>{ep.method}</span>
          <span className="qr-api-path">{ep.path}</span>
          <span className="qr-api-desc">{ep.desc}</span>
        </div>
      ))}
    </>
  );
}

// ── Dev Access Tab ────────────────────────────────────────────────────────────
function DevAccessTab({ data, isLoading, onDelete, onEdit }) {
  return (
    <div className="qr-panel">
      <div className="qr-panel-header">
        <span className="qr-panel-title">Identity access management</span>
        <span className="qr-panel-action">{data.length} seats active</span>
      </div>
      {isLoading ? <div className="qr-loading">Loading…</div> : (
        <div className="qr-table-wrap">
          <table className="qr-table">
            <thead>
              <tr>
                <th>UID</th>
                <th>Operator</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((dev, i) => (
                <tr key={i}>
                  <td><span className="qr-mono">#{String(dev.id).padStart(4, "0")}</span></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="qr-row-avatar" style={{ background: avatarColor(dev.name) }}>{initials(dev.name)}</div>
                      <span className="qr-row-name">{dev.name}</span>
                    </div>
                  </td>
                  <td><span className="qr-row-sub">{dev.email}</span></td>
                  <td><span className="qr-badge qr-badge-info">Developer</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button className="qr-action-btn" title="Edit" onClick={() => onEdit(dev)}><Edit size={13} /></button>
                    <button className="qr-action-btn danger" title="Revoke" onClick={() => onDelete("dev_access", dev.id)}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && <tr><td colSpan={5} className="qr-empty">No developers provisioned</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────────────────────
function SettingsTab({ isDark, setIsDark }) {
  return (
    <div className="qr-settings">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Global Configurations</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Manage system-wide preferences, environment variables, and interface themes.</p>
      </div>
      <div className="qr-panel">
        <div className="qr-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={18} style={{ color: '#64748b' }} />
            <span className="qr-panel-title">Interface preferences</span>
          </div>
        </div>
        <div className="qr-setting-row">
          <div>
            <div className="qr-setting-label">Color theme</div>
            <div className="qr-setting-sub">Choose light or dark mode for the dashboard</div>
          </div>
          <div className="qr-theme-btns">
            <button className={`qr-theme-btn${!isDark ? " active" : ""}`} onClick={() => setIsDark(false)}>
              <Sun size={13} /> Light
            </button>
            <button className={`qr-theme-btn${isDark ? " active" : ""}`} onClick={() => setIsDark(true)}>
              <Moon size={13} /> Dark
            </button>
          </div>
        </div>
        <div className="qr-setting-row">
          <div>
            <div className="qr-setting-label">System version</div>
            <div className="qr-setting-sub">Control Plane v2.4.1 — up to date</div>
          </div>
          <span className="qr-badge qr-badge-success">Stable</span>
        </div>
        <div className="qr-setting-row">
          <div>
            <div className="qr-setting-label">Environment</div>
            <div className="qr-setting-sub">Production — live data</div>
          </div>
          <span className="qr-badge qr-badge-danger">Production</span>
        </div>
      </div>
    </div>
  );
}

// ── Developer Form ────────────────────────────────────────────────────────────
function DeveloperForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name:  initialData?.name  || "",
    email: initialData?.email || "",
    pin:   initialData?.pin   || "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <div className="qr-field">
        <label>Operator name</label>
        <input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Full legal name" />
      </div>
      <div className="qr-field">
        <label>Email address</label>
        <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="operator@convosecai.com" />
      </div>
      <div className="qr-field">
        <label>Security PIN</label>
        <input required type="password" maxLength={4} value={form.pin} onChange={e => set("pin", e.target.value)} placeholder="4-digit PIN" style={{ fontFamily: "monospace", letterSpacing: "0.3em" }} />
      </div>
      <div className="qr-modal-actions">
        <button type="button" className="qr-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="qr-btn qr-btn-primary"><Save size={13} /> {initialData ? "Save changes" : "Provision"}</button>
      </div>
    </form>
  );
}

// ── Course Form ───────────────────────────────────────────────────────────────
function CourseForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    slug:            initialData?.slug            || "",
    title:           initialData?.title           || "",
    category:        initialData?.category        || "AI",
    difficulty:      initialData?.difficulty      || "Beginner",
    price:           initialData?.price           || 849,
    original_price:  initialData?.original_price  || 3499,
    image:           initialData?.image           || "",
    video_url:       initialData?.video_url       || "",
    duration:        initialData?.duration        || "8 weeks",
    description:     initialData?.description     || "",
    instructor_name: initialData?.instructor_name || "Nikky Bisen",
  });
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await api("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      if (data.url) {
        set("image", data.url);
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} style={{ maxHeight: "75vh", overflowY: "auto", paddingRight: "10px" }}>
      <div className="qr-grid-2">
        <div className="qr-field">
          <label>Course Title (Main)</label>
          <input required type="text" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Artificial Intelligence Mastery" />
        </div>
        <div className="qr-field">
          <label>Course Slug (URL)</label>
          <input required type="text" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="e.g. ai-mastery" />
        </div>
      </div>

      <div className="qr-field">
        <label>Thumbnail Image</label>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "16px", alignItems: "start" }}>
          <div className="qr-preview-box">
            {form.image ? <img src={form.image} alt="" /> : <div className="qr-no-img">No Image</div>}
          </div>
          <div className="qr-upload-zone">
            <input type="file" accept="image/*" onChange={handleFileUpload} id="file-upload" style={{ display: "none" }} />
            <label htmlFor="file-upload" className="qr-btn" style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}>
              <Upload size={13} /> {uploading ? "Uploading..." : "Upload from laptop"}
            </label>
            <div style={{ marginTop: "8px" }}>
              <input type="text" value={form.image} onChange={e => set("image", e.target.value)} placeholder="Or paste image URL here..." className="qr-input" />
            </div>
          </div>
        </div>
      </div>

      <div className="qr-field">
        <label>Video Intro Link (Embed)</label>
        <input type="text" value={form.video_url} onChange={e => set("video_url", e.target.value)} placeholder="https://youtube.com/..." />
      </div>

      <div className="qr-grid-2">
        <div className="qr-field">
          <label>Category</label>
          <select value={form.category} onChange={e => set("category", e.target.value)} className="qr-input">
            <option>AI</option>
            <option>Cybersecurity</option>
            <option>Data Analytics</option>
            <option>Generative AI</option>
            <option>AI & Machine Learning</option>
            <option>Deep Learning</option>
            <option>Cybersecurity / VAPT</option>
            <option>Data & Business Analytics</option>
          </select>
        </div>
        <div className="qr-field">
          <label>Difficulty</label>
          <select value={form.difficulty} onChange={e => set("difficulty", e.target.value)} className="qr-input">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Beginner to Intermediate</option>
            <option>Intermediate to Advanced</option>
          </select>
        </div>
      </div>

      <div className="qr-grid-2">
        <div className="qr-field">
          <label>Price (₹)</label>
          <input required type="number" value={form.price} onChange={e => set("price", Number(e.target.value))} />
        </div>
        <div className="qr-field">
          <label>Original Price (₹)</label>
          <input type="number" value={form.original_price} onChange={e => set("original_price", Number(e.target.value))} />
        </div>
      </div>

      <div className="qr-grid-2">
        <div className="qr-field">
          <label>Duration</label>
          <input required type="text" value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 10 weeks" />
        </div>
        <div className="qr-field">
          <label>Instructor Name</label>
          <input required type="text" value={form.instructor_name} onChange={e => set("instructor_name", e.target.value)} />
        </div>
      </div>

      <div className="qr-field">
        <label>Description</label>
        <textarea required value={form.description} onChange={e => set("description", e.target.value)} className="qr-textarea" rows={3} placeholder="Course summary..." />
      </div>

      <div className="qr-modal-actions">
        <button type="button" className="qr-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="qr-btn qr-btn-primary"><Save size={13} /> {initialData ? "Update Course" : "Create Course"}</button>
      </div>
    </form>
  );
}

// ── Messages Tab ──────────────────────────────────────────────────────────────
function MessagesTab({ data, isLoading, onDelete }) {
  const contacts = Array.isArray(data) ? data : [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Communications Hub</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Review and respond to corporate inquiries and student messages.</p>
      </div>
      <div className="qr-messages-list">
        {isLoading ? (
          <div className="qr-loading">Loading inquiries...</div>
        ) : contacts.length === 0 ? (
          <div className="qr-empty">No messages or inquiries found.</div>
        ) : (
          contacts.map((msg) => (
            <div key={msg.id} className="qr-msg-card">
              <div className="qr-msg-header">
                <div className="qr-msg-sender">
                  <div className="qr-row-avatar" style={{ background: avatarColor(msg.name), width: 40, height: 40, fontSize: 14 }}>
                    {initials(msg.name)}
                  </div>
                  <div>
                    <div className="qr-msg-name">{msg.name}</div>
                    <div className="qr-msg-email">{msg.email}</div>
                  </div>
                </div>
                <div className="qr-msg-meta">
                  <span className="qr-msg-time">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString("en-GB", { 
                      day: "numeric", 
                      month: "short", 
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : "—"}
                  </span>
                  <button 
                    className="qr-action-btn danger" 
                    title="Archive/Delete"
                    onClick={() => onDelete("contacts", msg.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              {(msg.organization || msg.sector || msg.subject) && (
                <div className="qr-msg-org">
                  {msg.organization && <strong>{msg.organization}</strong>}
                  {msg.organization && msg.sector && " • "}
                  {msg.sector && <span>{msg.sector}</span>}
                  {msg.subject && <div style={{ marginTop: 4, opacity: 0.8 }}>Subject: {msg.subject}</div>}
                </div>
              )}
              
              <div className="qr-msg-body">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
